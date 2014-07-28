Setup (on Mac OS X):
===================
Install Node (http://nodejs.org/). Use HomeBrew (http://brew.sh/) to install node.

#Open Terminal on Mac OS X and Run the following 
$brew install node

#Install http-server
$npm install http-server -g

#Incase you do not have npm you can use
curl https://npmjs.org/install.sh | sh

#Once installed you can test as given below :

mkdir MyProject
cd MyProject
touch index.html
echo "Hello World" > index.html
http-server -p 5000 &
curl -v "http://localhost:5000/index.html"

#You can also test by accessing teh URL from a browser window.


Getting Geo Data for India
============================
1. Download the Geo Data for India (shapefiles) . Note that this would contain the undisputed part of Indian territory only.
Google for IND_ADM.zip file  (http://archive.lib.msu.edu/maps/public/GISData/ OR http://www.naturalearthdata.com/downloads/10m-cultural-vectors/)

2. Unzip the folder IND_ADM and this is what you should see 
├── IND_adm0.csv
├── IND_adm0.dbf
├── IND_adm0.prj
├── IND_adm0.shp
├── IND_adm0.shx
├── IND_adm1.csv
├── IND_adm1.dbf
├── IND_adm1.prj
├── IND_adm1.shp
├── IND_adm1.shx
├── IND_adm2.csv
├── IND_adm2.dbf
├── IND_adm2.prj
├── IND_adm2.shp
├── IND_adm2.shx
├── IND_adm3.csv
├── IND_adm3.dbf
├── IND_adm3.prj
├── IND_adm3.shp
├── IND_adm3.shx
└── read_me.pdf

3. Download the Disputed territories shape file as well (source : http://www.naturalearthdata.com/downloads/10m-cultural-vectors/)
   Unzip the folder IND_ADM and this is what you should see
├── ne_10m_admin_0_disputed_areas_scale_rank_minor_islands.README.html
├── ne_10m_admin_0_disputed_areas_scale_rank_minor_islands.VERSION.txt
├── ne_10m_admin_0_disputed_areas_scale_rank_minor_islands.cpg
├── ne_10m_admin_0_disputed_areas_scale_rank_minor_islands.dbf
├── ne_10m_admin_0_disputed_areas_scale_rank_minor_islands.prj
├── ne_10m_admin_0_disputed_areas_scale_rank_minor_islands.shp
├── ne_10m_admin_0_disputed_areas_scale_rank_minor_islands.shx


3. Now we would work with the .shp files only (SHAPE files) to convert into JSON
4. For this we need the following tools installed :
	(i) gdal (Geospatial Data Abstraction Library - http://www.gdal.org ) which would also install tool ogr2ogr (http://www.gdal.org/ogr2ogr.html)
	$brew install gdal	
	 
	(ii) 
	$npm install -g topojson

	You might need to use sudo if you do get permission denied errors.

5. Now we convert the SHAPE data for INDIA to JSON. Go to teh IND_ADM folder and run teh following command line :

#for India boundary 
ogr2ogr \
  -f GeoJSON \
  -where "ADM0_A3 IN ('IND')" \
  IND0.json \
  IND_adm0.shp

#for India state boundary 
ogr2ogr \
  -f GeoJSON \
  -where "ADM0_A3 IN ('IND')" \
  IND1.json \
  IND_adm1.shp

#for India district boundary 
ogr2ogr \
  -f GeoJSON \
  -where "ADM0_A3 IN ('IND')" \
  IND2.json \
  IND_adm2.shp

#for India detailed district boundary 
ogr2ogr \
  -f GeoJSON \
  -where "ADM0_A3 IN ('IND')" \
  IND3.json \
  IND_adm3.shp

All the JSON above would have data only for the undisputed territories of India

6. Now we convert the SHAPE data for DISPUTED territories and extract data for India/China/Pakistan to JSON. 
Go to the ne_10m_admin_0_disputed_areas_scale_rank_minor_islands folder and run the following command line : 

ogr2ogr \
	-f GeoJSON \
	-where "sr_adm0_a3 IN ('IND','PAK','CHN')" \
	disputed.json \
	ne_10m_admin_0_disputed_areas_scale_rank_minor_islands.shp

7. Now theres a bit of manual merging that is needed .
Open the disputed.json file. 
Copy all the {"type" *} , i.e. the content between '"features": [...]'

Paste the same into '"features":[]' of IND0.json,IND1.json,IND2.json and IND3.json 

(Will figure out a better way to do this)

8. Now you are ready to use the json files with D3.

I will provide a TopoJson implementation details of the same later, since geoJSON files are huge.
There is a topojson version in the source (india.html)

I am greatly thankful to Mike Bostock's reference implementation -Lets make a map - "http://bost.ocks.org/mike/map/"


