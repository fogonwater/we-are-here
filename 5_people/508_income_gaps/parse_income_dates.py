import csv
import datetime
import math

SRC_DATA = 'data/TABLECODE7478_Data_c617a5d2-29b3-4a28-b726-0622d7e71631.csv'
DST_DATA = 'data/statsnz_wages_parsed_2018.csv'

def clean_row(row):
    row['hour_wage'] = float(row['Value'])
    row['annual_wage'] = row['hour_wage'] * 37.5 * 52
    row['daily_wage'] = row['annual_wage'] / 365.
    return dict(row)

def day_num_to_year(n):
    ''' Given number of days since Jan 1, what is the date?'''
    # We want to avoid leap year calculations. 2005 was year after a leap
    dt = datetime.datetime(2005, 1, 1) + datetime.timedelta(n - 1)
    return dt.strftime("%d %b %Y")

def parse_data():
    wages = []
    lowest_wage = {'group':None, 'annual_wage':None}
    for row in read_csv(SRC_DATA):
        wages.append(clean_row(row))
        last_annual_wage = wages[-1]['annual_wage']
        if not lowest_wage['annual_wage'] or last_annual_wage < lowest_wage['annual_wage']:
            lowest_wage = {
                'group': '{} {}'.format(row['Sex'], row['Ethnic Group']),
                'annual_wage':last_annual_wage
            }

    for row in wages:
        row['days_to_min'] = int(math.floor(lowest_wage['annual_wage'] / row['daily_wage']))
        row['date_of_min'] = day_num_to_year(row['days_to_min'])

    listdict_to_csv(wages, DST_DATA)

#
######
#


def read_csv(f_path, fieldnames=[]):
    with open(f_path) as f:
        reader = csv.DictReader(f)
        rows = [ row for row in reader]
    return rows

def listdict_to_csv(data, f_path):
    with open(f_path, 'w') as output_file:
        dict_writer = csv.DictWriter(output_file, data[0].keys())
        dict_writer.writeheader()
        dict_writer.writerows(data)
    print('Wrote {} with {} rows.'.format(f_path, len(data)))

def main():
    parse_data()

if __name__ == '__main__':
    main()
