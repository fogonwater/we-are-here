import csv
from random import shuffle

SRC_RESIDENTS = 'data/res_mb_points_2013.csv'
SRC_WORKERS = 'data/wrk_mb_points_2013.csv'
DST_FILE = 'data/combined_resiwork_mb_pts_2013.csv'


def parse_data():
    residents = read_csv(SRC_RESIDENTS)
    dots = []

    for item in residents:
        dots.append([
            item['X'],
            item['Y'],
            'resi',
        ])

    workers = read_csv(SRC_WORKERS)
    for item in workers:
        dots.append([
            item['X'],
            item['Y'],
            'work',
        ])
    shuffle(dots)

    # insert a header
    dots.insert(0, ['X', 'Y', 'reswrk'])

    list_to_csv(dots, DST_FILE)


def read_csv(f_path, fieldnames=[]):
    print('Reading {}'.format(f_path))
    with open(f_path) as f:
        if not fieldnames:
            reader = csv.DictReader(f)
        else:
            reader = csv.DictReader(f, fieldnames=fieldnames)
        rows = [row for row in reader]
    return rows


def list_to_csv(data, f_path):
    with open(f_path, 'wb') as f:
        writer = csv.writer(f)
        writer.writerows(data)
    print('Wrote {}.'.format(f_path))


def main():
    parse_data()


if __name__ == '__main__':
    main()
