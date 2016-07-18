FROM mongo

#all these files can be found here: http://www.geonames.org/

RUN echo 'we are copying the geonames data files'

#get these files from http://download.geonames.org/export/dump/
COPY ./data/allCountries.txt /allCountries.txt
RUN echo 'Copied geolocation files'

COPY ./data/admin1CodesASCII.txt /admin1CodesASCII.txt
RUN echo 'Copied admin1 files'

COPY ./data/admin2Codes.txt /admin2Codes.txt
RUN echo 'Copied admin2 files'

COPY ./mongo_script.js /mongo_script.js
RUN echo 'Copied mongo script'

COPY ./mongo_imports.sh /mongo_imports.sh
RUN echo 'Copied mongo import bash file'


CMD ./mongo_imports.sh

