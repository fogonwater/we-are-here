import csv

# rock class to major class mappings
RCLASSES = 'rock_class_major_classifications.csv'

# source list of all the various geological units, dumped from shapefile
SRC_DATA = 'gns_geological_units_NZTM_1_250k.csv'
DST_DATA = 'reclass_gns_geological_units_NZTM_1_250k.csv'


def build_mclasses():
    ''' Build lookup of major rock classes '''
    mclasses = {}
    rows = read_csv(RCLASSES)
    for row in rows:
        rclass = row['rock_class']
        mclass = row['major_class']
        mclasses[rclass] = mclass

    return mclasses


def main():
    # Read the CSV exported from the GNS shapefile
    rows = read_csv(SRC_DATA)
    # Create major classes lookup
    mclasses = build_mclasses()
    report = []
    # Loop through the shapefile and create an appropriate label
    for row in rows:
        rclass = row['ROCK_CLASS']
        rgroup = row['ROCK_GROUP']
        ageperiod = row['ageperiod']
        mclass = mclasses[rclass]
        if mclass == 'na':
            mclass = None

        # corrections for serpentinite
        if rgroup in ['serpentinite']:
            mclass = 'igneous'
        elif rgroup in ['gneiss']:
            mclass = 'metamorphic'

        if not ageperiod.strip():
            age = 'old'
        elif ageperiod in ['Quaternary']:
            age = 'young'
        else:
            age = 'old'

        label = '{} {}'.format(age, mclass)

        report.append({
            'id': row['IDENTIFIER'],
            'mclass': mclass,
            'rclass': rclass,
            'rgroup': rgroup,
            'ageperiod': ageperiod,
            'label': label,
        })
    # Export the updated data to a CSV
    dict_to_csv(report, DST_DATA)


def read_csv(f_path, fieldnames=[]):
    with open(f_path) as f:
        if not fieldnames:
            reader = csv.DictReader(f)
        else:
            reader = csv.DictReader(f, fieldnames=fieldnames)
        rows = [row for row in reader]
    return rows


def dict_to_csv(data, f_path):
    with open(f_path, 'w') as output_file:
        dict_writer = csv.DictWriter(output_file, data[0].keys())
        dict_writer.writeheader()
        dict_writer.writerows(data)
    print('Wrote {} with {} rows.'.format(f_path, len(data)))


if __name__ == '__main__':
    main()
