# coding=utf-8
from __future__ import division

import csv
import json
import os
import sys

SRC_FILE = 'data/nz_parliament_viz_history.csv'
IGNORE_FIELDS = ['Year', 'System']
PARTY_ORDER = [
    'NewLabour',
    'Alliance',
    'Green',
    'Progressive',
    'Labour',
    'Labour 1910',
    'United Labour',
    'Social Democrats',
    'Maori',
    'Mana',
    'Others',
    'Social Credit',
    'NZ First',
    'Independent',
    'Liberal',
    'Conservative',
    'United',
    'United NZ',
    'National',
    'Act',
    'Reform',
 ]

def get_row_year(row):
    return int(row['Year'].strip())

def get_election_years(rows):
    election_years = set()
    for row in rows:
        if row['System']:
            election_years.add(get_row_year(row))

    election_years = list(election_years)
    election_years.sort()
    return election_years

def get_parties(rows):
    parties = []
    for k, v in rows[0].items():
        if k in IGNORE_FIELDS:
            continue
        parties.append(k)

    parties.sort()
    return parties

def get_areas(rows):
    report = {}
    last_election_year = get_row_year(rows[0])
    for i, row in enumerate(rows):
        values = {}
        election_year = get_row_year(row)
        for k, v in row.items():
            if k in IGNORE_FIELDS:
                continue

            # handle last year differently
            if i == len(rows) - 1:
                if v.strip():
                    report[k].append({'x':election_year, 'y':int(v), 'party':k})
                else:
                    report[k].append({'x':election_year, 'y':0, 'party':k})
                continue

            for year in range(election_year, get_row_year(rows[i+1])):
                if k not in report:
                    report[k] = []
                if v.strip():
                    report[k].append({'x':year, 'y':int(v), 'party':k})
                else:
                    report[k].append({'x':year, 'y':0, 'party':k})


        last_election_year = election_year

    areas = []
    for party in PARTY_ORDER:
        areas.append(report[party])
    return areas

def read_csv(f_path, fieldnames=[]):
    with open(f_path) as f:
        if not fieldnames:
            reader = csv.DictReader(f)
        else:
            reader = csv.DictReader(f, fieldnames=fieldnames)
        rows = [ row for row in reader]
    return rows

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

def main():
    rows = read_csv(SRC_FILE)
    areas = get_areas(rows)
    write_json(areas, 'data/parliament_stream_data.json')
    election_years = get_election_years(rows)
    write_json(election_years, 'data/election_years.json')

if __name__ == '__main__':
    main()
