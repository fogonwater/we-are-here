import csv
import sys
from collections import OrderedDict
from pprint import pprint as pp

from dateutil.parser import parse as dt_parse

SRC_DATA = 'hansardrāindex.csv'

def read_csv(f_path):
    with open(f_path) as f:
        reader = csv.DictReader(f)
        rows = [ row for row in reader ]
    return rows

class Cleaner:
    def __init__(self, best_guess_year = 1854):
        self.best_guess_year = best_guess_year
        self.best_guess_confidence = 0
        self.rows = []
        self.guess_threshold = 3

    def add_row(self, row):
        year = self.get_year(row['date'])
        row['year'] = year
        self.rows.append(row)

    def increment_best_guess_year(self):
        self.best_guess_year += 1
        # there are no Hansard papers for 1857
        if self.best_guess_year == 1857:
            self.best_guess_year = 1858
        self.best_guess_confidence = 0

    def parse_year(self, raw_year):
        try:
            year = int(raw_year)
        except ValueError:
            year = self.best_guess_year
            return year

        s = str(year)
        s = s.replace('S', '5')
        if self.best_guess_year < 1900:
            # handle all the 1800 dates mistaken for 1300/1500 dates in the OCR
            if s.startswith('13') or s.startswith('15') or s.startswith('28') or s.startswith('I'):
                year = int('18{}'.format(s[-2:]))

        elif self.best_guess_year >= 1900 and self.best_guess_year < 2000:
            # handle all the 1900 dates mistaken for 1000/7900 dates in the OCR
            if s.startswith('10') or s.startswith('79') or s.startswith('I'):
                year = int('19{}'.format(s[-2:]))

        # if our "tidied" year matches our best year, return it
        if year == self.best_guess_year:
            self.best_guess_confidence = max(self.guess_threshold, self.best_guess_year + 1)
            return year

        # if our "tidied" year is within 2 years of best guess, return it ...
        # and decrement our confidence tracker
        if 0 <= year - self.best_guess_year <= 2:
            self.best_guess_confidence -= 1
            # if our best year confidence dips below -guess_threshold (e.g. -3)...
            # then go to the next year
            if self.best_guess_confidence <= -self.guess_threshold:
                self.increment_best_guess_year()

        return year

    def fill_holes(self):
        fix_count = 0
        unfixed_count = 0
        for i, row in enumerate(self.rows):
            if not row['year']:
                if self.rows[i-1]['year'] == self.rows[i+1]['year']:
                    self.rows[i]['year'] = self.rows[i-1]['year']
                    fix_count += 1
                else:
                    unfixed_count += 1
        print('=== First pass ===')
        print('Fixed {} holes.'.format(fix_count))
        print('Could not fix {} holes.'.format(unfixed_count))
        print('')
        print('')

    def get_year(self, s):
        raw_year = s.strip()[-4:]
        year = self.parse_year(raw_year)

        if 0 <= year - self.best_guess_year <= 2:
            self.best_guess_year = year
            return year

        return None

    def export(self, dst_file):
        header = list(self.rows[0].keys())
        report = [header]
        for row in self.rows:
            if row['year']:
                report.append(list(row.values()))
        list_to_csv(report, dst_file)

    def export_select_fields(self, dst_file, fieldnames=[]):
        report = [fieldnames]
        for row in self.rows:
            if not row['year']:
                continue
            new_row = []
            for f in fieldnames:
                new_row.append(row[f])
            report.append(new_row)
        list_to_csv(report, dst_file)

def list_to_csv(data, f_path):
    with open(f_path, 'w') as f:
        writer = csv.writer(f)
        writer.writerows(data)
    print('Wrote {} with {} rows.'.format(f_path, len(data) - 1))

def main():
    cleaner = Cleaner()
    rows = read_csv(SRC_DATA)
    for row in rows:
        cleaner.add_row(row)

    cleaner.fill_holes()
    cleaner.export('hansard_years.csv')
    cleaner.export_select_fields('summary_hansard_years.csv', fieldnames=[
       'volume','date','reo','ambiguous','other','percent','incomplete','year'
    ])


if __name__ == '__main__':
    main()
