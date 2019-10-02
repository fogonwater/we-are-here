import csv
import json
import os
import sys
from pprint import pprint as pp
import xml.etree.ElementTree as ET

SRC_CABLES = 'data/fusion-cables-201802261440.csv'
SRC_LANDING = 'data/fusion-landing-points-201802261440.csv'
DST_CABLES = 'data/cables.geojson'
DST_LANDING = 'data/landings.geojson'


def parse_cables():
    fc = {
        'type':'FeatureCollection',
        'features':[],
    }

    cables = read_csv(SRC_CABLES)
    for cable in cables:
        coors = cable['coordinates']
        tree = ET.ElementTree(ET.fromstring(coors))
        raw_coordinates = tree.findall('.//coordinates')

        feature = {
            'type':'Feature',
            'geometry': {'type':'MultiLineString', 'coordinates': []},
            'properties': {
                'color':cable['color']
            },
        }
        for raw_coordinate in raw_coordinates:
            # split out the coordinate pairs into long / lat
            coordinates = [[float(coor.split(',')[0]), float(coor.split(',')[1])] for coor in raw_coordinate.text.split(' ')]
            feature['geometry']['coordinates'].append(coordinates)

        fc['features'].append(feature)

    write_json(fc, DST_CABLES)

def parse_landing():
    fc = {
        'type':'FeatureCollection',
        'features':[],
    }

    landings = read_csv(SRC_LANDING)

    for landing in landings:
        coors = landing['coordinates']
        tree = ET.ElementTree(ET.fromstring(coors))
        raw_coordinates = tree.find('.//coordinates')

        feature = {
            'type':'Feature',
            'geometry': {
                'type':'Point',
                'coordinates': [float(raw_coordinates.text.split(',')[0]), float(raw_coordinates.text.split(',')[1])]
            },
            'properties': {
            },
        }

        fc['features'].append(feature)

    write_json(fc, DST_LANDING)





def parse_data():
    parse_cables()
    parse_landing()

#
######
#


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

def main():
    parse_data()

if __name__ == '__main__':
    main()
