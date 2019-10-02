import sys
import yaml
from pprint import pprint as pp
from datetime import datetime


class Transformer:
    def lower(self, s):
        return s.lower()

    def date_parser(self, s):
        for substring in ['(', ')']:
            s = s.replace(substring, '')
            s = s.strip()
        dt = None
        try:
            dt = datetime.strptime(s, '%d %b %Y')
        except ValueError:
            pass
        try:
            dt = datetime.strptime(s, '%d/%m/%y')
        except ValueError:
            pass

        if dt:
            return dt.strftime('%d %b %Y')
        else:
            print('Unable to parse {}\nExiting...'.format(s))
            sys.exit()


class Mapper:
    def __init__(self, src_rules):
        with open(src_rules, 'r') as f:
            mapping_rules = yaml.load(f)
        self.target = mapping_rules['target']

    def transform_value(self, val, transforms):
        for transform in transforms:
            val = dispatch(val, transform)
        return val

    def source_to_seq(self, target_rules, source):
        ''' Transform parts of the source object to a sequence '''
        li = list(target_rules)
        flat_source = flatten_dict(source)
        target = list()

        for item in target_rules:
            if isinstance(item, (dict)):
                search_key = item.get('_find').lower()
                val = flat_source.get(search_key)
                # skip empty items flagged "_optional"
                if not val and item.get('_optional'):
                    continue
                elif not val:
                    print(
                        '* Missing source_to_seq value for "_find: {}"'.format(search_key))
                    continue
                transforms = item.get('_transforms', [])
                item_name = item.get('_name', item.get('_find'))
                target.append({
                    'key': item_name,
                    'value': self.transform_value(val, transforms)
                })

        return target

    def source_to_dict(self, target_rules, source):
        ''' Transform parts of the source object to a dict '''
        flat_source = flatten_dict(source)
        d = dict(target_rules)
        target = dict()
        for key, item in d.items():
            # if a item is a dict, resolve that item
            if isinstance(item, (dict)):
                search_key = item.get('_find').lower()
                val = flat_source.get(search_key)
                if not val and item.get('_optional'):
                    print(
                        '* Missing source_to_dict value for "_find: {}" (opt)'.format(search_key))
                    continue
                elif not val:
                    print(
                        '* Missing source_to_dict value for "_find: {}"'.format(search_key))
                    continue
                transforms = item.get('_transforms', [])
                target[key] = self.transform_value(val, transforms)
            elif isinstance(item, (tuple, list, set)):
                target[key] = self.source_to_seq(item, source)
        return target

    def parse(self, source):
        if isinstance(self.target, (tuple, list, set)):
            #
            # TODO - handle sequences
            #
            print('Sequence todo')
            return None
        elif isinstance(self.target, (dict)):
            product = self.source_to_dict(self.target, source)
        else:
            print('Object supplied to Mapper.parse must be a tuple, list, set or dict.')
            return None
        return product


def dispatch(data, method_name):
    # http://stackoverflow.com/questions/7936572/python-call-a-function-from-string-name
    t = Transformer()
    return getattr(t, method_name)(data.strip())


def flatten_dict(d):
    # http://codereview.stackexchange.com/questions/21033/flatten-dictionary-in-python-functional-style
    def items():
        for key, value in d.items():
            if isinstance(value, dict):
                for subkey, subvalue in flatten_dict(value).items():
                    yield key + "." + subkey, subvalue
            else:
                yield key, value

    return dict(items())


def main():
    mapper = Mapper('data/mappings.yml')
    pp(mapper.parse(TEST3))


###

TEST1 = {
    "Act": "Animal Welfare Amendment Act (No 2) 2015 (2015/49)",
    "Bill no": "107-3",
    "Bill title": "Animal Welfare Amendment Bill",
    "Introduction": "08 May 2013",
    "Member in charge": "Hon Nathan Guy",
    "Parliament": "50-51",
    "Referred to": "Primary Production Committee",
    "Royal assent": "09 May 2015",
    "SC Report(s)": "26 Jun 2014",
    "Second reading": "26 Nov 2014",
    "Submissions due": "04 Oct 2013",
    "Supplementary Order Paper(s)": "355, 356, 367, 423, 473, 46, 47, 48, 69",
    "Third reading": "05 May 2015",
    "Type of Bill": "Government",
    "Honey pot": {"Bill no": "Trap value"}
}

TEST2 = {
    "Act": "Geographical Indications (Wine and Spirits) Registration Amendment Act 2016 (16/91)",
    "Bill no": "86-3",
    "Bill title": "Geographical Indications (Wine and Spirits) Registration Amendment Bill",
    "Committee of the whole House": "15/11/16",
    "First reading": "17/3/16",
    "Introduction": "3/11/15",
    "Member in charge": "Hon Paul Goldsmith",
    "Parliament": "51",
    "Referred to": "Primary Production Committee",
    "Royal assent": "25/11/16",
    "SC report(s)": "15/09/16",
    "Second reading": "2/11/16",
    "Submissions due": "29/4/16",
    "Supplementary Order Paper(s)": "244, 245, 246",
    "Third reading": "16/11/16",
    "Type of bill": "Government"
}

TEST3 = {
    "bill_no": "280-3",
    "days_since_now": 215,
    "src_last_activity": "21\u00a0May\u00a02018",
    "src_name": "Brokering (Weapons and Related Items) Controls Bill\n\t\t\t\t\t\t\t\nBill - government",
    "src_select_committee": "Foreign Affairs, Defence and Trade Committee",
    "stage": "RA",
    "stage_num": 7,
    "url_bill": "/en/pb/bills-and-laws/bills-proposed-laws/document/BILL_74425/brokering-weapons-and-related-items-controls-bill",
    "url_committee": "/en/pb/sc/scl/foreign-affairs-defence-and-trade/"
}

if __name__ == '__main__':
    main()
