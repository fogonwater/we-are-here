import csv
import json

SRC_DATA = 'nz_geology_1_250K.csv'
DST_DATA = 'feature_periods_1_250K.csv'
ID_FIELD = 'FEATUREID'
AGE_FIELD = 'STRATAGE'

def remove_dupes(seq):
    seen = set()
    seen_add = seen.add
    return [x for x in seq if not (x in seen or seen_add(x))]

def tokenize(s):
    s = s.replace(' ', '')
    s = s.replace('?', '')
    s = s.replace('+', '')
    raw_tokens = s.split(',')
    tokens = []
    for token in raw_tokens:
        if not token[0].isupper():
            tokens.append(token[1:])
        else:
            tokens.append(token)

    return remove_dupes(tokens)

def symbol_to_period(s):
    s = ''.join(i for i in s if not i.isdigit())
    symbols = {
        'Q' :'quaternary',
        'Pl':'pliocene',
        'Mi':'miocene',
        'Ol':'oligocene',
        'E' :'eocene',
        'Pa':'paleocene',
        'K' :'cretaceous',
        'J' :'jurassic',
        'Tr':'triassic',
        'Y' :'permian',
        'Ca':'carboniferous',
        'D' :'devonian',
        'S' :'silurian',
        'Or':'ordovician',
        'Cm':'cambrian',
        'TT':'tertiary',
        'MZ':'mesozoic',
        'PZ':'paleozoic',
    }
    return symbols[s.strip()]

def parse_data():
    rows = read_csv(SRC_DATA)
    report = [['feat_id', 'stratage', 'periods', 'eras']]

    for row in rows[:]:
        feature_id = row[ID_FIELD]
        if not row[AGE_FIELD].strip():
            continue
        period_symbols = tokenize(row[AGE_FIELD])

        periods = []
        eras = []
        for symbol in period_symbols:
            period = symbol_to_period(symbol)
            periods.append(period)
            eras.append(period_to_era[period])

        periods = remove_dupes(periods)
        eras = remove_dupes(eras)

        report.append([
            feature_id,
            row[AGE_FIELD],
            ', '.join(periods),
            ', '.join(eras),
        ])
    list_to_csv(report, DST_DATA)

period_to_era = {
    'quaternary':'quaternary',
    'tertiary':'tertiary',
    'pliocene':'tertiary',
    'miocene':'tertiary',
    'oligocene':'tertiary',
    'eocene':'tertiary',
    'paleocene':'tertiary',
    'mesozoic':'mesozoic',
    'cretaceous':'mesozoic',
    'jurassic':'mesozoic',
    'triassic':'mesozoic',
    'permian':'paleozoic',
    'carboniferous':'paleozoic',
    'devonian':'paleozoic',
    'silurian':'paleozoic',
    'ordovician':'paleozoic',
    'cambrian':'paleozoic',
    'paleozoic':'paleozoic',
}

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
    with open(f_path, 'w') as f:
        writer = csv.writer(f)
        writer.writerows(data)
    print('Wrote {} with {} rows.'.format(f_path, len(data) - 1))

def main():
    parse_data()

if __name__ == '__main__':
    main()
