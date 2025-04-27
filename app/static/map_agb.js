mapboxgl.accessToken = 'pk.eyJ1Ijoiam50dWNjZWxsYSIsImEiOiJja3VyNW84eDIwZzZ3Mm5sbjJ4bmk5ZW5pIn0.pJS-tfqDmr1IfUajBzMggQ';

// mapboxgl.accessToken = 'pk.eyJ1Ijoic2FyYmFuaWRhcyIsImEiOiJjbHh0Y3g2cjcxZTN4MmpxeWZpNWdoMnZwIn0.KcuQDxDuS7NaGF-YutmNdw';
const geojsonPolygonData = {
    "type": "FeatureCollection",
    "features": [
        {
            "type": "Feature",
            "geometry": {
                "type": "Polygon", 
                "coordinates": [
                    [
                     [-59.29816797399997, -9.286272225999944], 
                     [-59.27838106299999, -9.285539138999981], 
                     [-59.27826662499995, -9.28553489599995], 
                     [-59.27748112099994, -9.285505769999938], 
                     [-59.27731794699997, -9.285499695999935], 
                     [-59.27728947899994, -9.285498636999927], 
                     [-59.25706884999994, -9.284745367999951], 
                     [-59.25637105699997, -9.285782516999975], 
                     [-59.09532702999997, -9.287048965999924], 
                     [-59.10279102899994, -9.233942041999963], 
                     [-59.08051739099994, -9.234117633999963], 
                     [-59.08277232399996, -9.19120033299993], 
                     [-59.08210105299997, -9.14503333599992], 
                     [-59.10230850799996, -9.145493906999938], 
                     [-59.18347388199999, -9.145884693999957], 
                     [-59.19167486599996, -9.146201651999943], 
                     [-59.25359824499998, -9.14858884699992], 
                     [-59.25241063899995, -9.085491898999978], 
                     [-59.25239312799994, -9.084560324999917], 
                     [-59.25182384099998, -9.000496989999922], 
                     [-59.34645456899994, -9.000200080999935], 
                     [-59.42665671599996, -8.999316351999937], 
                     [-59.42678540699996, -8.999466721999969], 
                     [-59.42616803399995, -9.003031840999945], 
                     [-59.42441883499999, -9.004801119999971], 
                     [-59.42103956499994, -9.006309411999949], 
                     [-59.41824692999996, -9.008468691999951], 
                     [-59.41418741799998, -9.010414596999965], 
                     [-59.41101738399993, -9.013297535999932], 
                     [-59.40868777599996, -9.016293185999931], 
                     [-59.40682244199996, -9.02010448599997], 
                     [-59.40600418599996, -9.022809993999946], 
                     [-59.40576457899994, -9.026899652999935], 
                     [-59.40491337399993, -9.031190969999944], 
                     [-59.40138045199996, -9.038129297999944], 
                     [-59.39952090099996, -9.042355864999932], 
                     [-59.39648110999997, -9.044625952999969], 
                     [-59.38980091199994, -9.047140765999933], 
                     [-59.38506392399995, -9.049113737999967], 
                     [-59.38114181199995, -9.05282373499994], 
                     [-59.37542414099993, -9.055915603999946], 
                     [-59.37256027499996, -9.058691552999953], 
                     [-59.37009504499996, -9.064271527999953], 
                     [-59.37014641699994, -9.065170864999963], 
                     [-59.37617155999994, -9.087347651999947], 
                     [-59.37474431199995, -9.088643652999963], 
                     [-59.37657980599996, -9.092492530999955], 
                     [-59.37699135999998, -9.09559438599995], 
                     [-59.37920006999996, -9.100087220999967], 
                     [-59.37838172399996, -9.105070494999953], 
                     [-59.38303219599993, -9.110315886999947], 
                     [-59.38336220899998, -9.112295097999938], 
                     [-59.38338578099998, -9.11441619299996], 
                     [-59.38299501899997, -9.116021595999937], 
                     [-59.38398568599996, -9.11761798799995], 
                     [-59.38486235999995, -9.121107184999977], 
                     [-59.38281986199996, -9.122614507999973], 
                     [-59.37823692699993, -9.124777296999987], 
                     [-59.37593018499995, -9.12899162899992], 
                     [-59.37456342499996, -9.130818909999952], 
                     [-59.37227228699999, -9.132679158999972], 
                     [-59.37171808599999, -9.134457876999921], 
                     [-59.37120236099998, -9.135865058999965], 
                     [-59.36812368299996, -9.140150380999959], 
                     [-59.36523452999995, -9.141632721999946], 
                     [-59.36328577599993, -9.143201200999947], 
                     [-59.36116947199997, -9.146920019999929], 
                     [-59.36325528699995, -9.14996967599996], 
                     [-59.36729720299996, -9.149382797999984], 
                     [-59.36804792599997, -9.151213058999922], 
                     [-59.36790393099995, -9.153976610999962], 
                     [-59.36626665099993, -9.157864243999942], 
                     [-59.36296367299996, -9.161359616999963], 
                     [-59.36061440199996, -9.164195256999951], 
                     [-59.35735756399998, -9.16509829899997], 
                     [-59.35680623699994, -9.166536292999986], 
                     [-59.35611146599995, -9.167326226999936], 
                     [-59.35483531599994, -9.167733095999948], 
                     [-59.35523685099997, -9.169213602999944], 
                     [-59.35163734199995, -9.173644204999967], 
                     [-59.35295418099997, -9.174703320999988], 
                     [-59.35148074199998, -9.177029063999955], 
                     [-59.35317781099997, -9.179606619999953],
                     [-59.35570656699996, -9.180502664999953], 
                     [-59.35814317799997, -9.180423714999954], 
                     [-59.35990534799999, -9.182174508999932], 
                     [-59.36068326799995, -9.183961163999978], 
                     [-59.35993295299994, -9.186634320999934], 
                     [-59.35826924699995, -9.18798366799997], 
                     [-59.35539648599997, -9.189633043999947], 
                     [-59.35393420499998, -9.190735007999937], 
                     [-59.35112117199998, -9.190890240999972], 
                     [-59.35010531399997, -9.193057819999982], 
                     [-59.34932310699998, -9.195620429999963], 
                     [-59.34943141299994, -9.198040768999922], 
                     [-59.35051788999993, -9.199730199999978], 
                     [-59.35040084699994, -9.201373728999954], 
                     [-59.35137507899997, -9.202629713999958], 
                     [-59.35052956099997, -9.203355884999949], 
                     [-59.34983662499996, -9.204879177999947], 
                     [-59.35057298899995, -9.205404250999948], 
                     [-59.35107252299998, -9.206831585999959], 
                     [-59.35420572199997, -9.208224493999982], 
                     [-59.35495578099994, -9.209762510999958], 
                     [-59.35420377099997, -9.211117620999971], 
                     [-59.35436313199994, -9.212942723999962], 
                     [-59.35633482599997, -9.21373550999993], 
                     [-59.36135609199994, -9.211598644999983], 
                     [-59.36476283699994, -9.211534229999929], 
                     [-59.36811697899997, -9.215309837999934], 
                     [-59.37063215899996, -9.219349648999977], 
                     [-59.36951415199997, -9.220926914999945],
                     [-59.37000517099995, -9.222424181999948], 
                     [-59.37187417199993, -9.222862850999952], 
                     [-59.37266943199995, -9.224292197999953], 
                     [-59.37528770999995, -9.22651166799994], 
                     [-59.37747303999999, -9.228702388999984], 
                     [-59.37705992499996, -9.229945959999961], 
                     [-59.37693788299998, -9.232333815999931], 
                     [-59.37761984099995, -9.233967797999975], 
                     [-59.38165455799997, -9.23562616199996], 
                     [-59.38202576999999, -9.239382852999938], 
                     [-59.38385771799994, -9.242899671999973], 
                     [-59.38366172399998, -9.24428237099995], 
                     [-59.38445350299998, -9.245946300999954], 
                     [-59.38659595099995, -9.247053111999946], 
                     [-59.38908833899995, -9.251630205999959], 
                     [-59.38808324599995, -9.256676648999937], 
                     [-59.38908921899997, -9.25807475299997], 
                     [-59.38695025299995, -9.260465672999933], 
                     [-59.38005396599993, -9.264548110999947], 
                     [-59.37566218399995, -9.270613718999918], 
                     [-59.37616220099995, -9.273235663999973], 
                     [-59.37775189399996, -9.274743812999937], 
                     [-59.37967572299993, -9.279066020999945], 
                     [-59.38170804499998, -9.279884329999966], 
                     [-59.38207141199998, -9.281946125999976], 
                     [-59.38272716299997, -9.283705348999952], 
                     [-59.38472211599997, -9.285701435999961], 
                     [-59.38493500499993, -9.286619441999957], 
                     [-59.38606867799997, -9.288070394999986], 
                     [-59.38636443099994, -9.288787590999954], 
                     [-59.35568046299994, -9.287998531999955], 
                     [-59.33913504099996, -9.28757195199995], 
                     [-59.31991355699995, -9.287075405999934], 
                     [-59.31847911199997, -9.287038307999982], 
                     [-59.31835989299998, -9.287033814999969], 
                     [-59.29816797399997, -9.286272225999944]
                    ]
                ]
            },
            "properties": {
                "name": "Name: Florestal Santa Maria Project",
            }
        }
    ]
};
const geojsonData = {
    "type": "FeatureCollection",
    "features": [
        {
            "type": "Feature",
            "geometry": {
                "type": "Point",
                "coordinates": [
                    -59.355406,
                    -9.165371
                ]
            },
            "properties": {
                "name": "Name: The FSM-REDD Project",
                "key": "Key: VCS-875",
                "price": "Price: 1.0466833",
                "short_description": "The Florestal Santa Maria REDD Project, proposed by Florestal Santa Maria S/A, is located in Colniza Municipality, Mato Grosso, Brazil, and aims to combat the intense deforestation pressure in the region. The project estimates the avoidance of 29,923,331 tCO2 throughout 30 years by protecting 71,714 hectares of native forest on private land owned by FSM. The project also promotes local socio-environmental development through partnerships with a neighboring State Park and Colniza City Hall for education initiatives."
            }
        },
        {
            "type": "Feature",
            "geometry": {
                "type": "Point",
                "coordinates": [
                    -70.177176,
                    -8.847445
                ]
            },
            "properties": {
                "name": "Name: The Envira Amazonia Project - A Tropical Forest Conservation Project In Acre, Brazil",
                "key": "Key: VCS-1382",
                "price": "Price: 1.0548018",
                "short_description": "The Envira Amazonia Project in Brazil aimed to protect up to 200,000 hectares of tropical rainforest and preserve rich biodiversity and ecosystem services. It also provided direct benefits to local communities while mitigating the release of ~12.6 million metric tonnes of carbon dioxide emissions over the first 10 years of the Project."
            }
        },
        {
            "type": "Feature",
            "geometry": {
                "type": "Point",
                "coordinates": [
                    -69.069997,
                    -8.44646
                ]
            },
            "properties": {
                "name": "Name: Agrocortex REDD Project",
                "key": "Key: VCS-1686",
                "price": "Price: 1.0548018",
                "short_description": "The Agrocortex REDD Project aims to prevent the unplanned deforestation of 186,369.66 ha of Amazon rainforest in the South-western region of Brazil. The project also establishes a barrier against deforestation and contributes to the conservation of the region's biodiversity and climate regulation. Public comments were open from 12 May - 11 June 2017, with no comments received."
            }
        },
        {
            "type": "Feature",
            "geometry": {
                "type": "Point",
                "coordinates": [
                    -51.188205,
                    -2.893955
                ]
            },
            "properties": {
                "name": "Name: Pacajai REDD+ Project",
                "key": "Key: VCS-981",
                "price": "Price: 1.0548018",
                "short_description": "This project aimed to stop deforestation within private parcels in Brazil, covering 135,105 hectares at the edge of the deforestation frontier. It generated various benefits for the climate, social welfare, and biodiversity."
            }
        },
        {
            "type": "Feature",
            "geometry": {
                "type": "Point",
                "coordinates": [
                    -51.216667,
                    -27.766667
                ]
            },
            "properties": {
                "name": "Name: Baesa Project",
                "key": "Key: VCS-10",
                "price": "Price: 1.2806495",
                "short_description": "This carbon project reduces greenhouse gas emissions by using renewable energy and clean technology to generate electricity in Brazil. The installation of HPP Barra Grande generates enough electricity to supply 30% of the energy demand in Santa Catarina or 20% of the total energy consumed in Rio Grande do Sul, contributing to environmental, social and economical sustainability."
            }
        },
        {
            "type": "Feature",
            "geometry": {
                "type": "Point",
                "coordinates": [
                    -50.427069,
                    -1.050581
                ]
            },
            "properties": {
                "name": "Name: Ecomapua Amazon REDD Project",
                "key": "Key: VCS-1094",
                "price": "Price: 1.2806495",
                "short_description": "The Ecomapu\u00e1 Amazon REDD Project is located on Maraj\u00f3 Island in Brazil's Eastern Amazon region, and aims to prevent unplanned deforestation of a valuable ecosystem. Predicted net reductions of 4,253.14ha of deforestation and 2,170,138 tCO2e emissions over the 30-year project lifetime make this project a significant contribution to conservation goals and improving social and environmental conditions for local communities. The project also encourages further conservation efforts in this critical region."
            }
        },
        {
            "type": "Feature",
            "geometry": {
                "type": "Point",
                "coordinates": [
                    -49.466667,
                    -27.1
                ]
            },
            "properties": {
                "key": "Key: VCS-513",
                "name": "Name: Salto Pil\u00e3o Hydropower Plant Project Activity",
                "price": "Price: 1.2806495",
                "short_description": "The Salto Pil\u00e3o project in Brazil involved building a hydropower plant with a reservoir covering 0.15 km2 and generating 191.8 MW of power. The plant is located in the state of Santa Catarina and has been licensed for construction."
            }
        },
        {
            "type": "Feature",
            "geometry": {
                "type": "Point",
                "coordinates": [
                    -53.367499,
                    -29.12
                ]
            },
            "properties": {
                "key": "Key: VCS-708",
                "name": "Name: Engenheiro Ernesto Jorge Dreher And Engenheiro Henrique Kotzian Shps VCS Project (Jun1120)",
                "price": "Price: 1.2806495",
                "short_description": "This project generates electricity using renewable hydropower plants in J\u00falio de Castilhos and Salto Jacu\u00ed, Brazil. The project includes two plants, the Engenheiro Ernesto Jorge Dreher SHP and the Engenheiro Henrique Kotzian SHP, with installed powers of 17.95 MW and 13.230 MW, respectively. The project aims to reduce the use of fossil fuel-based power generation and provide electricity to the National Interconnected System."
            }
        },
        {
            "type": "Feature",
            "geometry": {
                "type": "Point",
                "coordinates": [
                    -53.043326,
                    -27.14
                ]
            },
            "properties": {
                "key": "Key: VCS-896",
                "name": "Name: Foz Do Chapec\u00f3 Project",
                "price": "Price: 1.2806495",
                "short_description": "The Foz do Chapec\u00f3 Hydroelectric Project generates low emissions electricity for the Brazilian Interconnected System by using hydrological resources of the Uruguay River. The project consists of four sets of hydroelectric Francis type turbines with a total installed capacity of 855 MW, and aims to reduce greenhouse gas emissions by displacing carbon-intensive electricity."
            }
        },
        {
            "type": "Feature",
            "geometry": {
                "type": "Point",
                "coordinates": [
                    -53.05434003576711,
                    -10.806773643498916
                ]
            },
            "properties": {
                "key": "Key: PUR-175613",
                "name": "Name: Aperam BioEnergia",
                "price": "Price: 210",
                "short_description": "Aperam BioEnergia, a leader in Brazil\u2019s forestry and renewable energy sectors, operates a 420,000-ton/year charcoal facility using FSC-certified forests. Their biochar project repurposes waste from charcoal production to enhance soil quality and sequester carbon, aiding biodiversity and local economies. With a focus on sustainability, the company plans to expand biochar operations to boost forest productivity and community development without increasing fossil fuel reliance. This initiative is part of Aperam's commitment to innovative environmental stewardship."
            }
        },
        {
            "type": "Feature",
            "geometry": {
                "type": "Point",
                "coordinates": [
                    -67.19637,
                    -16.12547
                ]
            },
            "properties": {
                "key": "Key: VCS-2089",
                "name": "Name: Rio Taquesi Hydroelectric Power Project",
                "price": "Price: 1.1373713",
                "short_description": "This carbon project, with the CDM Project ID 1031, converted units into VCUs in compliance with VCS requirements. For more details, please visit the project's page on the UNFCCC CDM website."
            }
        },
        {
            "type": "Feature",
            "geometry": {
                "type": "Point",
                "coordinates": [
                    -75.987144,
                    -7.083974
                ]
            },
            "properties": {
                "key": "Key: VCS-985",
                "name": "Name: Cordillera Azul National Park REDD Project",
                "price": "Price: 1.0400494",
                "short_description": "The Cordillera Azul National Park REDD+ Project involves preserving 1,351,964 hectares of lowland and montane forests in central Peru. The project aims to prevent deforestation by enhancing park protection, involving local communities and stakeholders in conservation-compatible land-use management, and improving the quality of life for surrounding residents. The project has discovered over 35 new species and is home to rare and endangered species, benefiting more than 180,000 residents from over 200 communities."
            }
        },
        {
            "type": "Feature",
            "geometry": {
                "type": "Point",
                "coordinates": [
                    -78.93144,
                    -2.966041
                ]
            },
            "properties": {
                "key": "Key: VCS-1883",
                "name": "Name: Pichacay Landfill Gas Renewable Energy Project",
                "price": "Price: 1.1321479",
                "short_description": "The Pichacay Landfill Gas Renewable Energy project in Ecuador collects methane gas from the Pichacay landfill, which was previously released into the atmosphere. The collected gas is then used to generate electricity that is delivered to the grid, reducing greenhouse gas emissions. This project underwent a public comment period from April to May 2019 and received no comments."
            }
        },
        {
            "type": "Feature",
            "geometry": {
                "type": "Point",
                "coordinates": [
                    -68.393333,
                    4.244444
                ]
            },
            "properties": {
                "key": "Key: VCS-1566",
                "name": "Name: REDD+ Project Resguardo Indigena Unificado Selva De Mataven (Riu Sm)",
                "price": "Price: 1.0352693",
                "short_description": "The REDD+ Project Resguardo Ind\u00edgena Unificado-Selva de Mataven (REDD+ RIU-SM) is a participatory project that aims to establish an integrated management system for forests and lands, ensuring their sustainability and mitigating threats to conservation. The project uses the REDD+ approach to provide compensation payments for ecosystem services, specifically for 'Avoiding Unplanned Deforestation and Degradation (AUDD)' in the Indigenous Reservation of Vichada, Colombia. The project adheres to the standards established by the VCS."
            }
        },
        {
            "type": "Feature",
            "geometry": {
                "type": "Point",
                "coordinates": [
                    -78.1837269878,
                    1.7654028613
                ]
            },
            "properties": {
                "key": "Key: ECO-114",
                "name": "Name: PROYECTO REDD+ PAZC\u00cdFICO SUR",
                "price": "Price: 180",
                "short_description": null
            }
        }
    ]
};
var geoJsonDataIND = '';
fetch('static/data/Geojson/CarbonProjectIND.geojson')
  .then(response => response.json())
  .then(data => {
    geoJsonDataIND = data; // Store the GeoJSON data in a variable
    console.log(geoJsonDataIND);  // Log the data to verify it's loaded properly
  })
  .catch(error => console.error('Error loading GeoJSON file:', error));



const map = new mapboxgl.Map({
    container: 'map',
    // style: 'mapbox://styles/jntuccella/cl11wwg25000z14t2q0gi2w5b/draft', 
    zoom: 4.5,
    center: [115, 0 ],
    // pitch: 80,
    // bearing: 41,
    // Choose from Mapbox's core styles, or make your own style with Mapbox Studio
    style: 'mapbox://styles/mapbox/satellite-streets-v12'
});

// add markers to map
for (const feature of geojsonData.features) {
  
  // code from step 5-1 will go here

  // make a marker for each feature and add to the map
  new mapboxgl.Marker().setLngLat(feature.geometry.coordinates).addTo(map);  // Replace this line with code from step 5-2
  new mapboxgl.Marker()
  .setLngLat(feature.geometry.coordinates)
  .setPopup(
    new mapboxgl.Popup({ offset: 25 }) // add popups
      .setHTML(
        `<h3>${feature.properties.key}</h3><h4>${feature.properties.name}</h4>
         <p>${feature.properties.price}</p>
         <p>${feature.properties.short_description}</p>`
      )
  )
  .addTo(map);
}

const addDataLayer = (date, type) => {
    $.ajax({
      type: "POST",
      url: "/agb_url",
      data: JSON.stringify([date, type]),
      contentType: "application/json",
      dataType: 'json',
      success: function(result) {
        map.addSource('AGB_Amazon_Basin', {
          'type': 'image',
          'url' : result.AGB_Amz,
          'coordinates': result.AGB_Cord
        });  
        map.addLayer(
          {
            'id': 'AGB_Amazon_Basin',
            'source': 'AGB_Amazon_Basin',
            'type': 'raster',
            'layout' : {
              'visibility': 'visible',
            },
            "paint" : {
                "raster-opacity" : 0.5,
                "raster-contrast" : 0.08
                // "raster-opacity" : 0.7,
                // "raster-contrast" : 0.0001
              
              }
            },
            );
        // Add REDD+ project layer
        map.addSource('geojson-data', {
          'type': 'geojson',
          'data': 'static/data/Geojson/REDDBrazil2011.geojson'
        });
        map.addLayer({
          'id': 'geojson-layer',
          'type': 'circle',
          'source': 'geojson-data',
          'paint': {
            'circle-radius': 5,          // Radius of the circle
            'circle-color': '#FF0000', 
          }
        }); 
        map.addSource('geojson-data-IND', {
            'type': 'geojson',
            'data': geoJsonDataIND,
          });
          map.addLayer({
            'id': 'geojson-layer-IND',
            'type': 'circle',
            'source': 'geojson-data-IND',
            'paint': {
              'circle-radius': 5,          // Radius of the circle
              'circle-color': '#FF0000', 
            }
          }); 
          map.addLayer({
            'id': 'geojsonpoly-layer-IND',
            'type': 'fill',
            'source': 'geojson-data-IND',
            'paint': {
                'fill-color': '#00FF00', // Green fill color
                'fill-opacity': 0.5
            }
        });
        map.addLayer({
            'id': 'reddProjectBordersIND',
            'type': 'line',
            'source': 'geojson-data-IND',
            'layout': {},
            'paint': {
                'line-color': '#000000',
                'line-width': 2,
                'line-dasharray': [2, 2]
            }
        });
        map.addSource('geojsonpoly-data', {
            'type': 'geojson',
            'data': geojsonPolygonData
        });
        map.addLayer({
            'id': 'geojsonpoly-layer',
            'type': 'fill',
            'source': 'geojsonpoly-data',
            'paint': {
                'fill-color': '#00FF00', // Green fill color
                'fill-opacity': 0.5
            }
        });
        map.addLayer({
            'id': 'reddProjectBorders',
            'type': 'line',
            'source': 'geojsonpoly-data',
            'layout': {},
            'paint': {
                'line-color': '#000000',
                'line-width': 2,
                'line-dasharray': [2, 2]
            }
        });
        map.addSource('mapbox-dem', {
            'type': 'raster-dem',
            'url': 'mapbox://mapbox.mapbox-terrain-dem-v1',
            'tileSize': 512,
            'maxzoom': 14
          });
          
        // // add the DEM source as a terrain layer with exaggerated height
        // map.setTerrain({ 'source': 'mapbox-dem', 'exaggeration': 1.5 });
        //omnivore.kml(result.AGB_Amz).addTo(map);
      } 
    });
  };
 
map.on('click', 'geojsonpoly-layer-IND', (e) => {
    console.log("Inside click function")
    console.log(e.features[0].geometry.type)
    var coordinates = ''
    if(e.features[0].geometry.type == 'MultiPolygon'){
        coordinates = e.features[0].geometry.coordinates[0][0][0];
        console.log("coordinates: ", e.features[0].coordinates[0][0])
    }
    else if((e.features[0].geometry.type == 'Polygon')){
        coordinates = e.features[0].geometry.coordinates[0][0];
    }
    console.log(coordinates)
    
    const properties = e.features[0].properties;
    console.log(properties)
    const popupContent = `<div style={{ width: '800px' }}>
        <strong>Project ID:</strong> ${properties.name} <br>
        <strong>Acres:</strong> ${properties.Acres} <br>
        <strong>Estimated Annual Emission Reductions:</strong> ${properties.EstAnEmisReduc} <br>
        <strong>Total Buffer Pool Credits: </strong>${properties.TotalBufferPoolCredits}<br>
        <strong>Link </strong> <a href='${properties.Link}'> here </a><br> </div>
    `;

    new mapboxgl.Popup()
        .setLngLat(coordinates)
        .setHTML(popupContent)
        .addTo(map);
});


const updateDataLayer = (date, type) => {
    map.removeLayer('AGB_Amazon_Basin');
    map.removeSource('AGB_Amazon_Basin');
    addDataLayer(date, type);
  };
  

  function refreshMapProjects() {
    return fetch('/projects/1')
      .then(r => {
        if (r.status === 404) return [];
        if (!r.ok) return Promise.reject(r.status);
        return r.json();
      })
      .then(projects => {
        const features = projects.map(p => ({
          type: 'Feature',
          geometry: JSON.parse(p.coordinates),
          properties: p
        }));
        const fc = { type: 'FeatureCollection', features };
  
        // update or add the userProjects source
        if (map.getSource('userProjects')) {
          map.getSource('userProjects').setData(fc);
        } else {
          map.addSource('userProjects', { type: 'geojson', data: fc });
        }
  
        ['userProjects-fill','userProjects-border'].forEach(id => {
          if (map.getLayer(id)) map.removeLayer(id);
        });
  
        // now add them using the same style as your hard-coded polygons:
        map.addLayer({
          id: 'userProjects-fill',
          type: 'fill',
          source: 'userProjects',
          paint: {
            'fill-color': '#00FF00',
            'fill-opacity': 0.5
          }
        });
        map.addLayer({
          id: 'userProjects-border',
          type: 'line',
          source: 'userProjects',
          paint: {
            'line-color': '#000000',
            'line-width': 2,
            'line-dasharray': [2,2]
          }
        });

        const verts = {
            type: 'FeatureCollection',
            features: features.flatMap(feat => {
              // assume simple polygons: use first ring
              return feat.geometry.coordinates[0].map(coord => ({
                type: 'Feature',
                geometry: { type: 'Point', coordinates: coord },
                properties: {}  // no extra props needed
              }));
            })
          };
    
          if (map.getSource('userProjectVerts')) {
            map.getSource('userProjectVerts').setData(verts);
          } else {
            map.addSource('userProjectVerts',{ type:'geojson', data:verts });
          }
    
          if (map.getLayer('userProjectVerts-circle')) {
            map.removeLayer('userProjectVerts-circle');
          }
    
          // draw blue circles at each vertex
          map.addLayer({
            id: 'userProjectVerts-circle',
            type: 'circle',
            source: 'userProjectVerts',
            paint: {
              'circle-radius': 4,       // adjust size to match red ones
              'circle-color': '#0000ff' // blue
            }
          });
  
        // re-bind click → same popup as static
        map.off('click','userProjects-fill');
        map.on('click','userProjects-fill', e => {
          const props = e.features[0].properties;
          console.log(props);
          const coord = e.lngLat;
          const html =
            `<strong>Project Name:</strong> ${props.project_name}<br>`+
            `<strong>Area:</strong> ${(props.acres * 0.404686).toLocaleString(undefined, {maximumFractionDigits:2})} Hectares<br>`+
            `<strong>Estimated Annual Emission Reductions:</strong> ${props.annual_equivalent_co2.toLocaleString()}<br>`+
            `<strong>Estimated ROI Per Annum:</strong> ${props.roi_per_year.toLocaleString()}<br>`
          new mapboxgl.Popup()
            .setLngLat(coord)
            .setHTML(html)
            .addTo(map);
        });
  
        // if none remain, clear Draw
        if (features.length === 0) {
          draw.deleteAll();
          updateArea();
        }
  
        return projects;
      })
      .catch(err => {
        console.error('refreshMapProjects error', err);
        if (map.getSource('userProjects')) {
          map.getSource('userProjects').setData({ type:'FeatureCollection', features:[] });
        }
        draw.deleteAll();
        updateArea();
        return [];
      });
  }
  
  
    
  map.on('load', () => {
    refreshSidebar();
    refreshMapProjects();
  });
  
  

  
// clear propModal inputs when hidden
document.getElementById('propModal')
  .addEventListener('hidden.bs.modal', () => {
    ['projectNameInput','projectDuration','developmentCost',
     'maintenanceCost','carbonPrice','annualAppreciation',
     'discountRate'].forEach(id=>{
       const el = document.getElementById(id);
       if (el.tagName === 'INPUT') el.value = '';
    });
  });


  const barModalEl = document.getElementById('barModal');

  barModalEl.addEventListener('hidden.bs.modal', () => {
    // 1) Clear just the text/stat fields:
    ['area','ton','price',
     'projectDurationOp','developmentCostOp','maintenanceCostOp',
     'carbonPriceOp','annualAppreciationOp','discountRateOp','analysis']
      .forEach(id => {
        const el = document.getElementById(id);
        if (el) el.innerText = '';
      });
  
    // 2) Unload C3 data (leaves the <div id="chart_…"> in the DOM):
    if (window.chartAnnual) window.chartAnnual.unload();
    if (window.chartNPV)    window.chartNPV.unload();
  
    // 3) Tear down the Mapbox mini‐map, but leave its <div id="modalMap">:
    if (window.modalMapInstance) {
      window.modalMapInstance.remove();
      window.modalMapInstance = null;
    }
  });
  