import mapnik
from xml.dom import minidom

'''
Script for making maps with mapnik from a mapnik XML style document.

North Island bounds for 224 x 290mm
1473900,5361000,2145900,6231000

South Island bounds for 224 x 290mm
1063000,4708000,1735000,5578000

For rendering a map in NZTM after styling it in Tilemill or similar,
the [map-name-style].xml file's projection (srs) needs updating.

<Map srs="+proj=tmerc +lat_0=0 +lon_0=173 +k=0.9996 +x_0=1600000 +y_0=10000000 +ellps=GRS80 +towgs84=0,0,0,0,0,0,0 +units=m +no_defs" background-color="#ffffff">

The map tag has several properties, including background-color, and not just srs.

conversions for A4
300 dpi = 2480 X 3508 pixels -> A4 as in 210mm * 297mm @ 300dpi
600 dpi = 4960 X 7016 pixels
'''

# Set size of output page in mm
MM_HIGH, MM_WIDE = 224, 290

# Define bounds of image in NZTM coors
NI_BOUNDS = (1473900, 5361000, 2145900, 6231000)
SI_BOUNDS = (1063000, 4708000, 1735000, 5578000)

# desired dots per inch
DPI = 600
# Source of style document — exported from Tilemill
NI_STYLE = SI_STYLE = 'mapnik_fire_contours_detail_v4.xml'
# output image names
NI_RENDER= 'detail_north_island_{}dpi.png'.format(DPI)
SI_RENDER= 'detail_south_island_{}dpi.png'.format(DPI)

def set_projection(src_path, dst_path):
    ''' Create a version of the source style document in NZTM '''
    srs_nztm = '+proj=tmerc +lat_0=0 +lon_0=173 +k=0.9996 +x_0=1600000 +y_0=10000000 +ellps=GRS80 +towgs84=0,0,0,0,0,0,0 +units=m +no_defs'
    xmldoc = minidom.parse(src_path)
    map_tag = xmldoc.getElementsByTagName('Map')
    firstchild = map_tag[0]
    firstchild.attributes['srs'].value = srs_nztm
    with open(dst_path, 'w') as f:
        f.write(xmldoc.toxml())
    print('{} created from {}.'.format(dst_path, src_path))

def mm_to_pixels(mm, dpi=300):
    ''' Convert mm to pixels at particular dpi '''
    pixels = (mm * dpi) / 25.4 # 1 inch -> 25.4mm
    return int(pixels)

def render(mapfile, dst_img, mm_width, mm_height, bounds, dpi=300, nztm_style='style-nztm.xml'):
    ''' Render an image with mapnik from an *.xml style file '''

   # create a version of the source style document in NZTM
    set_projection(mapfile, dst_path=nztm_style)

    # convert mm to pixels
    pixel_width = mm_to_pixels(mm_width, dpi)
    pixel_height = mm_to_pixels(mm_height, dpi)
    print('Rendering {} @ {} x {} pixels @ {} dpi'.format(dst_img, pixel_width, pixel_height, dpi))

    # create the output map
    m = mapnik.Map(pixel_width, pixel_height)
    # load style rules & set bounding box
    mapnik.load_map(m, nztm_style)
    bbox = mapnik.Envelope(mapnik.Coord(bounds[0], bounds[1]), mapnik.Coord(bounds[2], bounds[3]))
    m.zoom_to_box(bbox)
    # render map & save
    mapnik.render_to_file(m, dst_img)
    print('Rendered {} @ {} x {} pixels'.format(dst_img, pixel_width, pixel_height))

def main():
    render(NI_STYLE, NI_RENDER, MM_HIGH, MM_WIDE, NI_BOUNDS, dpi=DPI)
    render(SI_STYLE, SI_RENDER, MM_HIGH, MM_WIDE, SI_BOUNDS, dpi=DPI)

if __name__ == '__main__':
    main()
