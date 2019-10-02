import csv
import json
import os
import random
import sys
import time
import requests
from pprint import pprint as pp
from bs4 import BeautifulSoup
from datetime import datetime as dt
from dateutil import parser as dtparser

HTML_DIR = 'data/html'
MAX_PAGE_NUM = 50
# You will need to define a User-Agent for to make the requests
# You can use http://httpbin.org/get to see your browser's User-Agent
USER_AGENT = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_2) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/71.0.3578.98 Safari/537.36'
FORCE_REFRESH = False

def get_bill_uid(url):
    return url.split('/')[-2]

def get_bill_detail(bill_id, bill_url, refresh=False):
    '''Get the bill details page from local store or online'''
    page_name = '{}/detail/{}__{}.html'.format(HTML_DIR, get_bill_uid(bill_url), bill_id)
    # download from parliament.nz if file doesn't exist or refresh requested
    if not file_exists(page_name) or refresh:
        base_url = 'https://www.parliament.nz'
        url = base_url + bill_url
        fetch_html(url, page_name)
    with open(page_name, "r") as f:
        html = f.read()
    return html

def get_bill_list(page_num, refresh=False):
    '''Get the search indexes pages from local store or online'''
    page_name = '{}/index/search_{:03d}.html'.format(HTML_DIR, page_num)
    # download from parliament.nz if file doesn't exist or refresh requested
    if not file_exists(page_name) or refresh:
        base_bill_index_url = 'https://www.parliament.nz/en/pb/bills-and-laws/bills-proposed-laws/all?Criteria.PageNumber='
        url = '{}{}'.format(base_bill_index_url, page_num)
        fetch_html(url, page_name)
        print(url)
    with open(page_name, "r") as f:
        html = f.read()
    return html

def get_stage_number(code):
    return ['W', '','1','SC','2','CH','3','RA'].index(code)

def parse_bill_index_row(tds):
    keys   = ['src_name', 'bill_no', 'stage', 'src_last_activity', 'src_select_committee']
    values = [x.text.strip() for x in tds]

    # extract links from table cells
    keys.extend(['url_bill', 'url_committee'])
    for td in tds:
        values.extend(a['href'] for a in td.findAll('a'))
    while len(values) < len(keys):
        values.append(None)

    # translate stage into ordinal number
    keys.append('stage_num')
    values.append(get_stage_number(tds[2].text.strip()))


    # parse date
    keys.append('days_since_now')
    dt_stage = dtparser.parse(tds[3].text.strip())
    values.append( (dt.now() - dt_stage).days )


    # map both lists to a dict
    return dict(zip(keys, values))


def create_bills_list(dst_file, force_refresh=False):
    '''
    Works sequentially through a series of documents.
    Fetches documents that are missing locally from parliament.nz.
    Parses the resuts table for each document using BeautifulSoup,
    converting HTML content to standardised strings, identifiers and dates.
    '''
    print('Creating bills list...')
    # first get all the index pages
    raw_bill_list = []
    for page_num in range(1, MAX_PAGE_NUM):
        # get the search page
        html = get_bill_list(page_num, refresh=force_refresh)
        soup = BeautifulSoup(html, "html.parser")
        table = soup.find("table", {"class" : "table--list"})

        num_of_bills = len(raw_bill_list)
        trows = table.find_all('tr')
        for trow in trows:
            tds = trow.find_all('td')
            # skip blank rows
            if not tds:
                continue
            raw_bill_list.append(parse_bill_index_row(tds))

        if num_of_bills == len(raw_bill_list):
            break

    write_json(raw_bill_list, dst_file)

def main():
    create_bills_list('data/raw_bill_list.json', force_refresh=FORCE_REFRESH)
    bills_list = read_json('data/raw_bill_list.json')
    print("There are {} items in the bills list".format(len(bills_list)))
    for entry in bills_list:
        get_bill_detail(entry['bill_no'], entry['url_bill'])

#
###### HELPERS
#

def fetch_html(url, dst_file, verbose=True, throttle=1):
    ''' Fetch an html page using a url'''
    if verbose:
        print('\nFetching:{}'.format(url))
    # get the page and read into text
    headers = {'User-Agent': USER_AGENT}
    try:
        page = requests.get(url, headers=headers)
    except requests.exceptions.ConnectionError:
        print(' * requests.exceptions.ConnectionError. Waiting & trying again...')
        time.sleep(30)
        print('Trying again to fetch:{}'.format(url))
        page = requests.get(url, headers=headers)
    if page.status_code != 200:
        print('* Warning. {} code {}'.format(url, page.status_code))
    html = page.text
    # save the file locally
    with open('{}'.format(dst_file), "w") as text_file:
        text_file.write(html.strip())
    if verbose:
        print('Wrote {} from {}'.format(dst_file, url))
    # sleep for n seconds to be nice to servers
    time.sleep(throttle)
    if random.random() > 0.95:
        time.sleep(6)

def touch(fname='index.html', times=None):
    with open(fname, 'a'):
        os.utime(fname, times)

def read_csv(f_path, fieldnames=[]):
    with open(f_path) as f:
        if not fieldnames:
            reader = csv.DictReader(f)
        else:
            reader = csv.DictReader(f, fieldnames=fieldnames)
        rows = [ row for row in reader]
    return rows

def read_json(f_path):
    with open(f_path, 'r') as infile:
        data = json.load(infile)
    print('Read {}.'.format(f_path))
    return data

def write_json(data, f_path):
    with open(f_path, 'w') as outfile:
        json.dump(
            data,
            outfile,
            indent=2,
            sort_keys=True
        )
    print('{} written.'.format(f_path))

def list_to_csv(data, f_path):
    with open(f_path, 'wb') as f:
        writer = csv.writer(f)
        writer.writerows(data)
    print('Wrote {}.'.format(f_path))

def file_exists(fname):
    if os.path.isfile(fname):
        return True
    return False

if __name__ == '__main__':
    # main() is just above the helpers
    main()
