import csv
import os
import urllib.request
from math import floor

GNS_DIR = 'gns'
MERGE_DIR = 'merged'

def get_quakes():
    global GNS_DIR
    urls = [
        'https://quakesearch.geonet.org.nz/csv?bbox=164.5,-49,179.9,-33&startdate=2017-06-30&enddate=2017-08-04',
        'https://quakesearch.geonet.org.nz/csv?bbox=164.5,-49,179.9,-33&startdate=2016-12-01&enddate=2017-06-30',
        'https://quakesearch.geonet.org.nz/csv?bbox=164.5,-49,179.9,-33&startdate=2016-04-01&enddate=2016-12-01',
        'https://quakesearch.geonet.org.nz/csv?bbox=164.5,-49,179.9,-33&startdate=2015-03-01&enddate=2016-04-01',
        'https://quakesearch.geonet.org.nz/csv?bbox=164.5,-49,179.9,-33&startdate=2014-02-01&enddate=2015-03-01',
        'https://quakesearch.geonet.org.nz/csv?bbox=164.5,-49,179.9,-33&startdate=2013-04-01&enddate=2014-02-01',
        'https://quakesearch.geonet.org.nz/csv?bbox=164.5,-49,179.9,-33&startdate=2012-02-01&enddate=2013-04-01',
        'https://quakesearch.geonet.org.nz/csv?bbox=164.5,-49,179.9,-33&startdate=2011-03-01&enddate=2012-02-01',
        'https://quakesearch.geonet.org.nz/csv?bbox=164.5,-49,179.9,-33&startdate=2010-06-01&enddate=2011-03-01',
        'https://quakesearch.geonet.org.nz/csv?bbox=164.5,-49,179.9,-33&startdate=2009-07-01&enddate=2010-06-01',
        'https://quakesearch.geonet.org.nz/csv?bbox=164.5,-49,179.9,-33&startdate=2008-08-01&enddate=2009-07-01',
        'https://quakesearch.geonet.org.nz/csv?bbox=164.5,-49,179.9,-33&startdate=2007-07-01&enddate=2008-08-01',
        'https://quakesearch.geonet.org.nz/csv?bbox=164.5,-49,179.9,-33&startdate=2006-06-01&enddate=2007-07-01',
        'https://quakesearch.geonet.org.nz/csv?bbox=164.5,-49,179.9,-33&startdate=2005-04-01&enddate=2006-06-01',
        'https://quakesearch.geonet.org.nz/csv?bbox=164.5,-49,179.9,-33&startdate=2004-04-01&enddate=2005-04-01',
        'https://quakesearch.geonet.org.nz/csv?bbox=164.5,-49,179.9,-33&startdate=2003-04-01&enddate=2004-04-01',
        'https://quakesearch.geonet.org.nz/csv?bbox=164.5,-49,179.9,-33&startdate=2001-09-01&enddate=2003-04-01',
        'https://quakesearch.geonet.org.nz/csv?bbox=164.5,-49,179.9,-33&startdate=2000-05-01&enddate=2001-09-01',
        'https://quakesearch.geonet.org.nz/csv?bbox=164.5,-49,179.9,-33&startdate=1998-06-01&enddate=2000-05-01',
        'https://quakesearch.geonet.org.nz/csv?bbox=164.5,-49,179.9,-33&startdate=1997-02-01&enddate=1998-06-01',
        'https://quakesearch.geonet.org.nz/csv?bbox=164.5,-49,179.9,-33&startdate=1995-09-01&enddate=1997-02-01',
        'https://quakesearch.geonet.org.nz/csv?bbox=164.5,-49,179.9,-33&startdate=1994-08-01&enddate=1995-09-01',
        'https://quakesearch.geonet.org.nz/csv?bbox=164.5,-49,179.9,-33&startdate=1993-12-01&enddate=1994-08-01',
        'https://quakesearch.geonet.org.nz/csv?bbox=164.5,-49,179.9,-33&startdate=1992-09-01&enddate=1993-12-01',
        'https://quakesearch.geonet.org.nz/csv?bbox=164.5,-49,179.9,-33&startdate=1991-01-01&enddate=1992-09-01',
        'https://quakesearch.geonet.org.nz/csv?bbox=164.5,-49,179.9,-33&startdate=1989-01-01&enddate=1991-01-01',
        'https://quakesearch.geonet.org.nz/csv?bbox=164.5,-49,179.9,-33&startdate=1982-08-01&enddate=1989-01-01',
        'https://quakesearch.geonet.org.nz/csv?bbox=164.5,-49,179.9,-33&startdate=1967-05-01&enddate=1982-08-01',
        'https://quakesearch.geonet.org.nz/csv?bbox=164.5,-49,179.9,-33&startdate=1800-1-01T0:00:00&enddate=1967-05-01',
    ]
    for i, url in enumerate(urls):
        f_name = '{}/quakes_{:02d}.csv'.format(GNS_DIR, i)
        urllib.request.urlretrieve(url, f_name)
        print('Retrieved: {}\nWrote: {}'.format(url, f_name))

def merge_years(start_year, finish_year=2020):
    global GNS_DIR, MERGE_DIR
    f_paths = get_filenames('{}/'.format(GNS_DIR), prefix='quake', suffix='csv')
    header = ['origintime', 'publicid', 'latitude', 'longitude', 'depth', 'magnitude']
    report = []
    for f_path in f_paths:
        quakes = read_csv(f_path, strip_header=True)
        for q in quakes:
            magnitude = float(q['magnitude'])
            if magnitude <= 0.:
                continue
            year = int(q['origintime'][:4])
            if year >= start_year and year <= finish_year:
                # add value for each field in our header
                row = [q[f] for f in header]
                # calculate the inverse log of magnitude and add as raw value
                row.append(pow(10, magnitude))
                report.append(row)

    report.sort()
    print('Writing {} events to csv...'.format(len(report)))
    # add in our calculated raw_mag header
    header.append('raw_mag')
    report.insert(0, header)
    list_to_csv(report, '{}/quakes_{}-{}.csv'.format(MERGE_DIR, start_year, finish_year))

def get_filenames(f_dir, prefix='', suffix=''):
    """Get list of filenames within a directory. Optionally scope by prefix/suffix."""
    f_names = []
    for r,d,files in os.walk(f_dir):
        for f in files:
            if f.startswith(prefix) and f.endswith(suffix):
                f_names.append('{}/{}'.format(r, f))
    return f_names

def read_csv(f_path, strip_header=False):
    with open(f_path) as f:
        # optionally strip whitespace from header values (e.g. '  depth' -> 'depth')
        if strip_header:
            fieldnames = [h.strip() for h in f.readline().split(',')]
        reader = csv.DictReader(f, fieldnames=fieldnames)
        rows = [ row for row in reader ]
    return rows

def list_to_csv(data, f_path):
    with open(f_path, 'w') as f:
        writer = csv.writer(f)
        writer.writerows(data)
    print('Wrote {} with {} rows.'.format(f_path, len(data) - 1))


def main():
    get_quakes()
    merge_years(start_year=2008, finish_year=2017)

if __name__ == '__main__':
    main()
