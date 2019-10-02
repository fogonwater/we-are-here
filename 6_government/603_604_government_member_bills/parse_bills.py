import json
import os
import random
from bs4 import BeautifulSoup # pylint: disable=import-error
from pprint import pprint as pp

from mapper import Mapper

def parse_page(html):
    soup = BeautifulSoup(html, "html.parser")
    table = soup.find("table", {"class" : "variablelist"})
    trows = table.find_all('tr')
    title = soup.find('title').text.strip()

    item = {'bill title':title.replace(' - New Zealand Parliament', '')}
    for trow in trows:
        ths = trow.find_all('th')
        tds = trow.find_all('td')
        # skip blank rows
        if not tds:
            continue
        k = ths[0].text.strip()
        k = k[:-1]
        k = k.lower()
        v = tds[0].text.strip()
        # skip blank rows and interim reports
        if not k and not v or 'interim report' in v.lower():
            continue
        for substring in ['negatived']:
            if substring in v:
                parts = v.split(substring)
                k = substring
                v = parts[-1].strip()
        if 'discharged' in v.lower():
            k = 'discharged'
        if 'sc report(s)' in k.lower():
            k = 'SC Report(s)'
        if 'withdrawn' in v.lower():
            k = 'withdrawn'
        item[k] = v

    return item

def html_to_json():
    f_names = get_filenames('data/html/detail')
    report = []
    
    print('Parsing {} raw HTML bill pages to JSON...'.format(len(f_names)))
    for f_name in f_names:#[:200]:
        with open(f_name, "r") as f:
            html = f.read()
        item = parse_page(html)
        report.append(item)
        #if "51" in item['Parliament'] or "50" in item['Parliament']:
        #    report.append(item)
    write_json(report, 'data/bill_dates.json')
    print('')

def main():
    html_to_json()

    mapper = Mapper('data/mappings.yml')
    rows = read_json('data/bill_dates.json')
    report = []
    bill_types = set()
    for row in rows:
        bill_id = row.get('Bill no')
        parsed = mapper.parse(row)
        # pull out one bill for a look
        if bill_id == "64-1":
            pp(bill_id)
            pp(row)
            pp(parsed)
        report.append(mapper.parse(row))
        bill_types.add(row['type of bill'])
    write_json(report, 'data/bill_events.json')
    print('Report written with {} rows.'.format(len(report)))
    print( 'Bill types: {}'.format(str(list(bill_types))) )

##
## HELPERS
##

def read_json(f_path):
    with open(f_path, 'r') as infile:
        data = json.load(infile)
    print('Read {}.'.format(f_path))
    return data

def get_filenames(f_dir, suffix=''):
    f_names = []
    for r,d,files in os.walk(f_dir):
        for f in files:
            if f.endswith(suffix):
                f_names.append('%s/%s' % (r, f))
    return f_names

def write_json(data, f_path):
    with open(f_path, 'w') as outfile:
        json.dump(
            data,
            outfile,
            indent=2,
            sort_keys=True
        )
    print('{} written with {} elements.'.format(f_path, len(data)))

if __name__ == '__main__':
    main()
