#!/bin/bash


mongoimport --host mongo --db reminisceme --collection geonames --type tsv --drop --file ./allCountries.txt \
--fields geonameid,name,asciiname,alternatenames,latitude,longitude,feature_class,\
feature_code,country_code,cc2,admin1_code,admin2_code,admin3_code,admin4_code,\
population,elevation,dem,timezone,modification_date

mongoimport --host mongo --db reminisceme --collection admin1Codes  --type tsv --file admin1CodesASCII.txt \
--fields area_code,name,alternative_name,number --drop

mongoimport --host mongo --db reminisceme --collection admin2Codes  --type tsv --file admin2Codes.txt \
--fields area_code,name,alternative_name,number  --drop

mongo --host mongo ./mongo_script.js
