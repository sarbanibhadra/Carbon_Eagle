import os
import json
import re
import datetime
import xarray as xr
import pandas as pd
import numpy as np
import area
from flask import (
    Blueprint, render_template, request, jsonify,
    redirect, url_for, send_from_directory, current_app
)
from google.cloud import storage
from .extensions import db
from .db_models import User, Project

bp = Blueprint('main', __name__)

 
config = {
    "apiKey": os.environ["FB_APIKEY"],
    "authDomain": "stob-298612.firebaseapp.com",
    "projectId": "stob-298612",
    "storageBucket": "stob-298612.appspot.com",
    "messagingSenderId": os.environ["FB_MESS"],
    "databaseURL" : "",
    "appId": os.environ["FB_APPID"],
    "measurementId": os.environ["FB_MESID"]
}                              
            
#initialize firebase
#firebase = pyrebase.initialize_app(config)                     
#auth = firebase.auth()      
#db = firebase.database()


# Serve static files from the 'static' directory
@bp.route('/<path:filename>')               
def serve_file(filename):
    return send_from_directory('', filename)  


@bp.route('/')
def login():      
    return render_template('login.html')

@bp.route('/map', methods = ["POST", 'GET']) 
def map():
    if request.method == 'POST':
        result = request.form           #Get the data
        email = result["email"]
        password = result["pass"]
        try:
            #Try signing in the user with the given information
            user = auth.sign_in_with_email_and_password(email, password)
            #Redirect to welcome page
            return render_template('map.html')
        except:
                #If there is any error, redirect back to login
            #return redirect(url_for("main.login"))
            return render_template('map.html')
    else :
        return redirect(url_for("main.login"))  

@bp.route('/map_agb', methods = ["POST", 'GET'])                                       
def map_agb():
    if request.method == 'POST': 
        result = request.form           #Get the data
        email = result["email"]   
        password = result["pass"]
        try:
            #Try signing in the user with the given information
            user = auth.sign_in_with_email_and_password(email, password)
            print("user")
            print(user)
            #Redirect to welcome page
            return render_template('map_agb.html')     
        except:
                #If there is any error, redirect back to login
            #return redirect(url_for("main.login"))      
            return render_template('map_agb.html') 
    else :
        print("checking request body")
        print(request.method)
        print(request.headers)    
        return redirect(url_for("main.login"))   

@bp.route('/annual_mean_agb', methods = ["POST", "GET"])
def annual_mean_agb(): 
    return render_template('annual_mean_agb.html') 


@bp.route('/model')        
def model():
    return render_template('model.html')  
     

@bp.route('/mean_agb', methods=['POST'])
def mean_agb():
    poly_data = request.get_json()
    poly_type = poly_data['type']
    poly_coor = poly_data['coordinates']
    try:
        poly_time=poly_data['year']
    except:  
        poly_time=2021
    
    fn='app/static/data/AGB/Amazon_AGB_Base_2003.nc'
    print(fn)
    ds = xr.open_dataset(fn,  engine='netcdf4')
    ds.rio.write_crs("epsg:4326", inplace=True)
    ds = ds.rename({'lon': 'x'})
    ds = ds.rename({'lat': 'y'})
    print(ds)
    geometries = [
        { 
        'type': poly_type,
        'coordinates': poly_coor
        }
    ]
    # poly_time=[2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020, 2021]
    ds_clipped = ds['AGB'].rio.clip(geometries, from_disk=True)
    print(ds_clipped['year'].values)
    mean_agb_per_year = ds_clipped.groupby('year').mean(dim=['y', 'x'], skipna=True)
    print(mean_agb_per_year.values)

    # Convert the mean_agb_per_year DataArray to a Pandas DataFrame
    mean_agb_per_year_df = mean_agb_per_year.to_dataframe().reset_index()

    # Convert DataFrame to dictionary for JSON serialization
    results = {
        'year': mean_agb_per_year_df['year'].tolist(),
        'annual_mean': mean_agb_per_year_df['AGB'].tolist()
    }

    # Assuming you are within a Flask app context, return the results as JSON
    response = jsonify(results)      
    print(response) 
    return response


@bp.route('/mean_agb_hr', methods=['POST'])
def mean_agb_hr():
    poly_data = request.get_json()
    poly_type = poly_data['type']                               
    poly_coor = poly_data['coordinates']
    #try:
    #    poly_time=poly_data['year']
    #except:
    #    poly_time=2021 

    #fn='app/static/data/AGB/SM_SCIE_MIR_L4AGBA_20110101T000000_20211231T235959_100_002_8.nc'
    fn='app/static/data/AGB/ESA_CCI_3x3.nc'
    #ds = xr.open_dataset(fn)
    ds = xr.open_dataset(fn,  engine='netcdf4', chunks={'lat': 1000,'lon':1000})
    ds.rio.write_crs("epsg:4326", inplace=True)
    ds = ds.rename({'lon': 'x'})
    ds = ds.rename({'lat': 'y'})
    geometries = [
        {     
        'type': poly_type,
        'coordinates': poly_coor
        }
    ]
    ds_clipped = ds['agb'].rio.clip(geometries, from_disk=True)
    results={'mean_AGB_t_per_ha': float(ds_clipped.mean().values)}#,
            #'TOTAL_poly_area_ha': area.area(geometries_4a)/10000}

    return jsonify(results)


@bp.route('/mean_agb_vhr', methods=['POST'])
def mean_agb_vhr():  
    poly_data = request.get_json()
    poly_type = poly_data['type']
    poly_coor = poly_data['coordinates']
    #try:
    #    poly_time=poly_data['year']
    #except: 
    #    poly_time=2021

    #fn='app/static/data/AGB/SM_SCIE_MIR_L4AGBA_20110101T000000_20211231T235959_100_002_8.nc'
    #fn='app/static/data/AGB/ESA_CCI_3x3.nc'
    fn='app/static/data/AGB/ESA_CCI_ORIGINALres_IND.nc'
    #ds = xr.open_dataset(fn)
    ds = xr.open_dataset(fn, engine='netcdf4', chunks={'lat': 1000,'lon':1000})    
    ds.rio.write_crs("epsg:4326", inplace=True)
    ds = ds.rename({'lon': 'x'})
    ds = ds.rename({'lat': 'y'}) 
    geometries = [
        {                                                   
        'type': poly_type,
        'coordinates': poly_coor
        }
    ]
    ds_clipped = ds['agb'].rio.clip(geometries, from_disk=True)
    results={'mean_AGB_t_per_ha': float(ds_clipped.mean().values)}#,
            #'TOTAL_poly_area_ha': area.area(geometries_4a)/10000}

    return jsonify(results)
    

@bp.route('/mean_agb_mr', methods=['POST'])
def mean_agb_mr():
    poly_data = request.get_json()
    poly_type = poly_data['type']
    poly_coor = poly_data['coordinates']
    #try:
    #    poly_time=poly_data['year']
    #except:
    #    poly_time=2021

    #fn='app/static/data/AGB/SM_SCIE_MIR_L4AGBA_20110101T000000_20211231T235959_100_002_8.nc'
    #fn='app/static/data/AGB/ESA_CCI_3x3.nc'
    fn='app/static/data/AGB/ESA_CCI_1km.nc'
    #ds = xr.open_dataset(fn)
    ds = xr.open_dataset(fn, engine='netcdf4', chunks={'lat': 1000,'lon':1000})
    ds.rio.write_crs("epsg:4326", inplace=True)
    ds = ds.rename({'lon': 'x'})
    ds = ds.rename({'lat': 'y'})
    geometries = [
        {
        'type': poly_type,
        'coordinates': poly_coor
        }
    ]
    ds_clipped = ds['agb'].rio.clip(geometries, from_disk=True)
    results={'mean_AGB_t_per_ha': float(ds_clipped.mean().values)}#,
            #'TOTAL_poly_area_ha': area.area(geometries_4a)/10000}  
    return jsonify(results)                                     


@bp.route('/investCmap', methods=['POST'])
def investCmap():  
    poly_data = request.get_json()
    # poly_type = poly_data['type']
    # poly_coor = poly_data['coordinates']

    poly_type = "Polygon"
    poly_coor = [[[112.88196217843677, -0.9511746358780897],[112.47465940855932, -1.4769893645020318],[112.57351930416093, -1.9631594243978725],[114.13155125883895, -1.4690831864524228],[113.03222921975072, -0.708119721719948],[112.88196217843677, -0.9511746358780897]]]

    print("poly_type: "+poly_type)
    print(poly_coor)
    geometries = [
        {
        'type': poly_type,
        'coordinates': poly_coor
        }
    ]

    geometries_4a = {
        'type': poly_type,
        'coordinates': poly_coor
        }


    fn='app/static/data/AGB/Fig1_InvestibleCarbon_VARNAME_IND.nc' 
    #fn='app/static/data/AGB/Fig1_InvestibleCarbon_VARNAME_IND_MEAN.nc'
    # ds = xr.open_dataset(fn)
    ds=xr.open_dataset(fn, engine='netcdf4', chunks={'lat': 100,'lon':100})
    ds.rio.write_crs("epsg:4326", inplace=True)
    ds = ds.rename({'lon': 'x'})
    ds = ds.rename({'lat': 'y'})

    #ds_clipped = ds.investC.rio.clip(geometries, from_disk=True).mean().compute() #Sept2023
    # Price over the years: 1st 5 years constant followed by annual price appreciation

    NN=ds.investC.rio.clip(geometries, from_disk=True).compute()      


     # Save the clipped data as a GeoTIFF
    #output_tiff_path = '/media/psf/Home/nkadyg/AGB/clipped_data.tif'
    output_tiff_path = 'app/static/data/AGB/clipped_data.tif'
    NN.rio.to_raster(output_tiff_path)

    # Return the GeoTIFF file as a response
    # return send_file(output_tiff_path, as_attachment=True)   
    # Create an empty dictionary to store the clipped data
    clipped_data_dict = {}

    #
    for x in NN.coords['x'].values:
        for y in NN.coords['y'].values:
            value = float(NN.sel(x=x, y=y).values)  # Get the value at the current coordinate
        # Create a dictionary entry for the current coordinate and value
        #clipped_data_dict[(x, y)] = value
        
        # Create a dictionary entry with concatenated (x, y) as the key
            key = f"{x},{y}"
            if ~np.isnan(value): clipped_data_dict[key] = value
        # Create a JSON response using Flask's jsonify

    gridaerea=(area.area(geometries_4a)/10000)/(NN.shape[0]*NN.shape[1])
        
    image_name = 'http://localhost:8000/clipped_data.tif'
        
    clipped_data_dict2 = {
    "investC": clipped_data_dict,
    "metadata": {
        "shape": NN.shape,
        "grid_area": gridaerea,
        },
    "FR" : image_name
    }    
        
    response = jsonify(clipped_data_dict2)
 
    # Set the content type to JSON
    response.headers["Content-Type"] = "application/json"

    # Return the JSON response
    return response


@bp.route('/ROImap', methods=['POST'])
def ROImap():
    print("Inside ROIMap")
    poly_data = request.get_json()
    poly_type = poly_data['type']
    poly_coor = poly_data['coordinates']
    # poly_coor = [[[115, -10], [120, -12], [121, -14], [124, -13], [115, -10]]]
    geometries = [
        {
        'type': poly_type,
        'coordinates': poly_coor
        }
    ]

    geometries_4a = {
        'type': poly_type,
        'coordinates': poly_coor
        }

    fn='app/static/data/AGB/Fig2_NetPresentValue.nc'
    # fn='app/static/data/AGB/Fig2_NetPresentValue_IND_1km.nc'
    # fn='app/static/data/AGB/Fig1_InvestibleCarbon_VARNAME_IND_MEAN.nc'
    # ds = xr.open_dataset(fn)
    ds=xr.open_dataset(fn, engine='netcdf4', chunks={'lat': 100,'lon':100})
    ds.rio.write_crs("epsg:4326", inplace=True)
    ds = ds.rename({'lon': 'x'})
    ds = ds.rename({'lat': 'y'})
    print("ds")

    #ds_clipped = ds.investC.rio.clip(geometries, from_disk=True).mean().compute() #Sept2023
    # Price over the years: 1st 5 years constant followed by annual price appreciation

    NN=ds.Band1.rio.clip(geometries, from_disk=True).compute()
    print("NN")
    print(NN)

    #Save the clipped data as a GeoTIFF
    #output_tiff_path = '/media/psf/Home/nkadyg/AGB/clipped_data.tif'
    #NN.rio.to_raster(output_tiff_path)

    #Return the GeoTIFF file as a response
    #return send_file(output_tiff_path, as_attachment=True)   
    #Create an empty dictionary to store the clipped data
    clipped_data_dict = {}

    
    # Iterate through the coordinates and values in NN2
    for x in NN.coords['x'].values:
        for y in NN.coords['y'].values:
            value = float(NN.sel(x=x, y=y).values)  # Get the value at the current coordinate
        # Create a dictionary entry for the current coordinate and value
        #clipped_data_dict[(x, y)] = value
        
        # Create a dictionary entry with concatenated (x, y) as the key
            key = f"{x},{y}"
            if ~np.isnan(value): clipped_data_dict[key] = value
        # Create a JSON response using Flask's jsonify

    gridaerea=(area.area(geometries_4a)/10000)/(NN.shape[0]*NN.shape[1])
    print("gridarea")
    print(gridaerea)
    clipped_data_dict2 = {
    "NPV": clipped_data_dict,
    "metadata": {
        "shape": NN.shape,
        "grid_area": gridaerea,
        },
    }    

        
    response = jsonify(clipped_data_dict2)
 
    # Set the content type to JSON
    response.headers["Content-Type"] = "application/json"
    print("Finish ROImap")  

    # Return the JSON response
    return response

@bp.route('/roi', methods=['POST'])   
def roi():
    print("Inside  roi")
    
    poly_data = request.get_json()
    print(poly_data)
    poly_type = poly_data['type']
    poly_coor = poly_data['coordinates'] 
    # poly_coor = [[[-76.77935480747018, -2.7058467265188426], [-77.48118497232794, -3.9781038571958334], [-77.2607644033777, -4.941862047651924], [-76.60386526126864, -4.8976083856654355], [-75.76926284883304, -4.678643897070529], [-76.77935480747018, -2.7058467265188426]]]
    # poly_coor = [[[115, -10], [120, -12], [121, -14], [124, -13], [115, -10]]]
    
    geometries = [
        {   
        'type': poly_type,
        'coordinates': poly_coor 
        }
    ]        
    geometries_4a = {
        'type': poly_type,
        'coordinates': poly_coor
        }     

    try:
        prDur=int(poly_data['projectDuration']) 
    except:
        prDur = 30
    
    if prDur <= 5: prDur=30        
   
    try:
        developmentCost=float(poly_data['developmentCost'])
    except:
        developmentCost = 25

    try:
        maintenanceCost=float(poly_data['maintenanceCost'])
    except:
        maintenanceCost = 10      
  
    try:
        discountRate=float(poly_data['discountRate'])
    except:
        discountRate = 0.1

    try:
        annualAppreciation=float(poly_data['annualAppreciation']) 
    except:
        annualAppreciation = 0.05

    try:
        averagePrice=float(poly_data['carbonPrice'])
    except:  
        averagePrice = 5.8            
               

    #fn='app/static/data/AGB/Fig1_InvestibleCarbon_VARNAME_IND.nc'
    # fn='app/static/data/AGB/Fig1_InvestibleCarbon_VARNAME_IND_MEAN.nc'
    fn='app/static/data/AGB/Fig1_InvestibleCarbon.nc'
    # ds = xr.open_dataset(fn)
    ds=xr.open_dataset(fn, engine='netcdf4', chunks={'lat': 100,'lon':100})
    ds.rio.write_crs("epsg:4326", inplace=True)
    ds = ds.rename({'lon': 'x'})
    ds = ds.rename({'lat': 'y'})
    print("Fig1_InvestibleCarbon")                   
    print(ds.values)

    #ds_clipped = ds.investC.rio.clip(geometries, from_disk=True).mean().compute() #Sept2023
    # Price over the years: 1st 5 years constant followed by annual price appreciation
    try:
        print("Inside try")   
        print(geometries)
        NN=ds.Band1.rio.clip(geometries, from_disk=True).compute()
        # NN=ds.investC.rio.clip(geometries, from_disk=True).compute()
        print("NN")
        print(NN.shape[0], NN.shape[1])
        gridaerea=(area.area(geometries_4a)/10000)/(NN.shape[0]*NN.shape[1])
        print(gridaerea)

        #invest=gridaerea*ds.investC.rio.clip(geometries, from_disk=True).sum().compute()
        invest=(NN*gridaerea).sum().compute()
        print("invest:=  ")
        print(invest)
        non_na_mask = ~np.isnan(NN)
        print("non_na_mask:  ")

        # PAPER NPV################
        fn_ver2='app/static/data/AGB/Fig2_NetPresentValue.nc'
        print("fn_ver2")
        #ds = xr.open_dataset(fn_ver1)
        ds2=xr.open_dataset(fn_ver2, engine='netcdf4', chunks={'lat': 100,'lon':100})
        ds2.rio.write_crs("epsg:4326", inplace=True)
        ds2 = ds2.rename({'lon': 'x'})
        ds2 = ds2.rename({'lat': 'y'}) 
        print("Fig2_NetPresentValue")
        # print(ds2.Band1.rio.clip(geometries, from_disk=True))    

        NN2=ds2.Band1.rio.clip(geometries, from_disk=True).compute()
        print(NN2) 
        gridaerea=(area.area(geometries_4a)/10000)/(NN2.shape[0]*NN2.shape[1])

        NPV_PAPER=(NN2*gridaerea).sum().compute()
        print("NPV_PAPER")                                             
        print(NPV_PAPER.values)                                                                   
                                  
        ###########################       

        years = np.arange(1, prDur+1)    
        prices = np.zeros(prDur)
        prices[:5] = averagePrice
        for h in range(5, prDur):
            prices[h] = prices[h - 1] * (1 + annualAppreciation)
        # Year 0
        data_list=[]
        #yri = -developmentCost
    
        yri=(NN.where(~np.isnan(NN))*0-developmentCost).compute()

        yri_y = []
        f_year=2022
    
        for h in range(1, prDur+1):
            #yri_1 = (ds_clipped * prices[h - 1] - maintenanceCost) / ((1 + discountRate) ** h)
            yri_1 = (NN * prices[h - 1] - maintenanceCost) / ((1 + discountRate) ** h)  
            yri += yri_1
            f_year += 1  
            #data_dict = {'NVP_year': {str(f_year): int(yri_1.values*(area.area(geometries_4a)/10000))}} # SEPT2023
            data_dict = {'NVP_year': {str(f_year): int((yri_1*gridaerea).sum().compute().values)}}
            #data_dict = {'NVP_year': {str(f_year): int(NPV_PAPER.values)}}
            data_list.append(data_dict)    
            roi_NPV = (((yri*gridaerea).sum().compute()))/prDur #yri.mean().values/prDur
            print("roi_NPV:")       

        cardio = round(float(invest), 2) #float((invest/prDur).values) #CO2 
        print(format_to_dollar(str(round(float(NPV_PAPER.values), 2))))
        results={'ROI_NPV_USDperYear' : format_to_dollar(str(round(float(NPV_PAPER.values), 2))),
                'ForestCarbon_tCo2e' : cardio,
                'TOTAL_poly_area_ha' : str(round(area.area(geometries_4a)/10000, 2)),
                'Forest_area' : float(NN.count()*gridaerea),
                'coordinates': poly_coor,   
                'projectDurationOp': prDur,
                'developmentCostOp': developmentCost, 
                'maintenanceCostOp': maintenanceCost,
                'carbonPriceOp':  0.5,       
                'annualAppreciationOp': annualAppreciation,
                'discountRateOp':  discountRate,
                'ROIperYear': round(float(NPV_PAPER.values), 2)}                             
    
        # Create the 'NVP_year' key in 'results' if it doesn't exist
        if 'NVP_year' not in results:       
            results['NVP_year'] = {}
          
        for item in data_list:                             
            inner_dict = item['NVP_year']
            year = list(inner_dict.keys())[0]
            value = inner_dict[year]
            results['NVP_year'][year] = value

        print("results")              
        print(results)
          
    except:
            ###########################  
            print("Inside exept")
            years = np.arange(1, prDur+1)
            prices = np.zeros(prDur)
            prices[:5] = averagePrice
            for h in range(5, prDur):
                prices[h] = prices[h - 1] * (1 + annualAppreciation)
            # Year 0
            data_list=[]
            #yri = -developmentCost
            f_year=2022
            for h in range(1, prDur+1):
                f_year += 1
                data_dict = {'NVP_year': {str(f_year): int(0)}}
                data_list.append(data_dict)

            cardio = float(0) #float((invest/prDur).values) #CO2

            results={'ROI_NPV_USDperYear' : float(0),  
                    'ForestCarbon_tCo2e' : cardio, 
                    'TOTAL_poly_area_ha' : str(round(area.area(geometries_4a)/10000, 2)),
                    'Forest_area' : float(0),        
                    'coordinates': poly_coor,
                    'projectDurationOp': prDur,
                    'developmentCostOp': developmentCost, 
                    'maintenanceCostOp': maintenanceCost,
                    'carbonPriceOp':  0.5,       
                    'annualAppreciationOp': annualAppreciation,
                    'discountRateOp':  discountRate,
                    'ROIperYear' : float(0)}              

            # Create the 'NVP_year' key in 'results' if it doesn't exist
            if 'NVP_year' not in results:
                results['NVP_year'] = {} 

            for item in data_list:
                inner_dict = item['NVP_year']
                year = list(inner_dict.keys())[0]
                value = inner_dict[year]
                results['NVP_year'][year] = float(0)
            print(results)
            print("finish roi")
    return results

@bp.route('/polygon_exposure', methods=['POST'])        
def compute_human_exposure():
    poly_data = request.get_json()             
    poly_type = poly_data['type']
    poly_coor = poly_data['coordinates']             
    df = health_indicator(poly_coor, poly_type)
    percent_good = df.Good.mean()*100
    percent_moderate = df.Moderate.mean()*100
    percent_poor = df.Poor.mean()*100
    percent_very_poor = df.Very_Poor.mean()*100
    percent_severe = df.Severe.mean()*100
    results = {'percent_good' : percent_good, 'percent_moderate' : percent_moderate, 'percent_poor' : percent_poor, 'percent_very_poor' : percent_very_poor, 'percent_severe' : percent_severe}
    return jsonify(results)

@bp.route('/agb_polygon_exposure', methods=['GET', 'POST'])
def agb_polygon_exposure():  
    print("Inside routes/agb_polygon_exposure ")    
    poly_data = request.get_json()
    poly_type = poly_data.get('type')                      
    poly_coor = poly_data.get('coordinates')                              
    print(poly_type)
    print(request.method)
    df_results = compute_mean_agb(poly_type, poly_coor)    
    nvp_results = roi()        

    # Assuming you are within a Flask app context, return the results as JSON
    df_results['nvp_results'] = nvp_results   
    print("nvp_results.values()")
    print(nvp_results.values())  

    NPV_year_value =  nvp_results.get('NVP_year')
    NPV_years = [int(key) for key in NPV_year_value.keys()]
    NPV_values = [int(val) for val in NPV_year_value.values()]
    print(NPV_years)
    print(NPV_values) 
       
    df_results['npv_years'] = NPV_years 
    df_results['npv_values'] = NPV_values 

    print("df_results")
    print(df_results)
    
    response = jsonify(df_results)      
    print("response ")
    #results = {'year': df_annual_mean.year.to_list(), 'annual_mean' : df_annual_mean.PredNO2.to_list()}
    return response

# DATABASE ROUTES
@bp.route('/add_user', methods=['POST'])
def add_user():
    data = request.json
    new_user = User(name=data['name'])
    db.session.add(new_user)
    db.session.commit()
    return jsonify({'user_id': new_user.user_id})

@bp.route('/add_project', methods=['POST'])
def add_project():
    data = request.get_json() or {}

    new_project = Project(
        user_id                 = data.get('user_id'),
        project_name            = data.get('project_name'),
        coordinates             = data.get('coordinates'),
        acres                   = data.get('acres'),
        annual_equivalent_co2   = data.get('annual_equivalent_co2'),
        roi_per_year            = data.get('roi_per_year'),
        report_data = data.get('report_data')
    )

    db.session.add(new_project)
    db.session.commit()

    return jsonify({'project_id': new_project.project_id})



@bp.route('/delete_project', methods=['POST'])
def delete_project():
    data = request.json
    user_id = data.get('user_id')
    project_id = data.get('project_id')

    # Validate inputs
    if user_id is None or project_id is None:
        return jsonify({'error': 'user_id and project_id are required'}), 400

    # Find the project belonging to the user
    project = Project.query.filter_by(user_id=user_id, project_id=project_id).first()

    if not project:
        return jsonify({'error': f'No project found for user_id={user_id} and project_id={project_id}'}), 404

    db.session.delete(project)
    db.session.commit()

    return jsonify({'message': f'Project {project_id} deleted successfully'})

@bp.route('/projects/<int:user_id>', methods=['GET'])
def get_projects_by_user(user_id):
    projs = Project.query.filter_by(user_id=user_id).all()
    if not projs:
        return jsonify([]), 404

    return jsonify([{
        'project_id': p.project_id,
        'project_name': p.project_name,
        'coordinates': p.coordinates,
        'acres': p.acres,
        'annual_equivalent_co2': p.annual_equivalent_co2,
        'roi_per_year': p.roi_per_year,
        'report_data': p.report_data   # ← the entire JSON blob
    } for p in projs])



                                  
def compute_mean_agb(poly_type, poly_coor): 
    print("inside compute_mean_agb")
    print(request.method)
    fn='app/static/data/AGB/SM_SCIE_MIR_L4AGBA_20110101T000000_20211231T235959_100_002_8.nc'
    print("Test0")    
    try:
        print(fn)
        ds = xr.open_dataset(fn)  
        print(ds)  
    except Exception as e:
        print(f"Error loading dataset: {e}")
    
    print("Test1")                                            
    ds.rio.write_crs("epsg:4326", inplace=True) 
    ds = ds.rename({'lon': 'x'})
    ds = ds.rename({'lat': 'y'})                   
    geometries = [
        {           
        'type': poly_type,
        'coordinates': poly_coor
        }    
    ]                 
    print("Test2")
    # poly_time=[2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020, 2021]
    ds_clipped = ds['AGB'].rio.clip(geometries, from_disk=True)
    print("Test3")
    mean_agb_per_year = ds_clipped.groupby('year').sum(dim=['y', 'x'], skipna=True)
    print("Test4")
    # Convert the mean_agb_per_year DataArray to a Pandas DataFrame
    mean_agb_per_year_df = mean_agb_per_year.to_dataframe().reset_index()
    print("Test5")
    # Convert DataFrame to dictionary for JSON serialization
    results = {        
        'year': mean_agb_per_year_df['year'].tolist(),
        'annual_mean': mean_agb_per_year_df['AGB'].tolist(),
        'annual_carbon': (mean_agb_per_year_df['AGB'] * 0.47).tolist()   
    }
    print(results)    
    return results

@bp.route('/point_exposure', methods=['POST'])
def compute_point_exposure():
    point_data = request.get_json()
    print("point_data")
    print(point_data)
    lat = point_data['lat']     
    lon = point_data['lng']
    df_annual_mean = annual_mean(lat, lon)
    df_daily = daily_concentration(lat, lon)
    ####
    WHO_daily_limit = 25
    if len(df_daily) > 0 :
        percentage_exposure = len(df_daily[df_daily.PredNO2 >WHO_daily_limit])/ len(df_daily) * 100
        percentage_exposure = round(percentage_exposure, 2)
    else :    
        percentage_exposure = 0
    
    #df_annual_mean['year'] = df_annual_mean.time.apply(lambda x: x.year)
    results = {'year': df_annual_mean.year.to_list(), 'annual_mean' : df_annual_mean.PredNO2.to_list(), 'day' : df_daily.time.to_list(), 'daily_concentration' : df_daily.PredNO2.to_list(), 'percentage_exposure' : percentage_exposure}
    return jsonify(results)   

@bp.route('/gc_url', methods=['POST'])
def get_image_url():
    date = request.get_json()
    year = date[:4]
    month = date[5:7]
    day = date[8:]
    #bucket_name = 's5p_geye'
    bucket_name = 'helloworld-gee-app.appspot.com'
    blob_name = 'IMAGES/FR_LCM/MAP_FR_' + year + month + day + '.png'
    os.environ["GOOGLE_APPLICATION_CREDENTIALS"] = "gc_key.json"
    url = generate_download_signed_url_v4(bucket_name, blob_name)
    print(url) 
    result = {'FR' : url}
    return jsonify(result)
                  
@bp.route('/agb_url', methods=['POST'])                 
def get_agbimage_url():   
    print("Inside agb_url ")
    data = request.get_json()   
    print(data)  
    year = str(data[0])      
    type = str(data[1])
    print(year)
    if type == 'None':
        image_name = 'http://localhost:8000/Amazon_AGB_2003P.png'    #GEDI data   
        coordinates = [
            [-80.0, 10.0],
            [-44.0, 10.0],
            [-44.0, -18.0],                           
            [-80.0, -18.0]    
            ]    
    else:
        image_name = 'http://localhost:8000/'+type+'_'+year+'.png'
        coordinates = [  
            [-178, 63],
            [176.5, 60],
            [176, -58],
            [-178.5, -49]  
            ] 
                        
    # year = date[:4] 
    # month = date[5:7]                  
    # day = date[8:]     
    # #bucket_name = 's5p_geye'   
    # bucket_name = 'helloworld-gee-app.appspot.com'
    # blob_name = 'IMAGES/FR_LCM/MAP_FR_' + year + month + day + '.png'
    # os.environ["GOOGLE_APPLICATION_CREDENTIALS"] = "gc_key.json" 
    # url = generate_download_signed_url_v4(bucket_name, blob_name) 
    #  image_name = 'http://localhost:8000/'+type+'.png'      
    print(image_name +"   "+ year)                               
    result = {'AGB_Amz' : image_name,
              'AGB_Cord': coordinates} 
    return jsonify(result)

##################################################################################################################################################################################################
def generate_download_signed_url_v4(bucket_name, blob_name):
    """Generates a v4 signed URL for downloading a blob.

    Note that this method requires a service account key file. You can not use
    this if you are using Application Default Credentials from Google Compute
    Engine or from the Google Cloud SDK.
    """
    # bucket_name = 'your-bucket-name'
    # blob_name = 'your-object-name'c  

    #storage_client = storage.Client() #XXXXXXXXXXXXXXX
    storage_client = storage.Client.from_service_account_json('gc_key.json')
    bucket = storage_client.bucket(bucket_name)
    blob = bucket.blob(blob_name)
                                                 
                        
    url = blob.generate_signed_url(
        version="v4",
        # This URL is valid for 15 minutes
        expiration=datetime.timedelta(seconds=3),
        # Allow GET requests using this URL.
        method="GET",
    )
    return url              
             

### When clicking in one of the province, retrieve the shape of the province, retrieve data to GCS and plot the times serie of average concentration in the province. 
def annual_mean(lat, lon):
    folder = "app/static/data/Pred_Y_Mean/"
    list_file = os.listdir(folder)
    list_file = sorted(list_file, key=lambda i: os.path.splitext(os.path.basename(i))[0]) # XXXXXX

    df = pd.DataFrame()
    
    for f in list_file:
        file_path = folder + f
        yearly_mean = xr.open_dataset(file_path,  engine='netcdf4')
        bbox = [yearly_mean.Lat.min(), yearly_mean.Lat.max(), yearly_mean.Lon.min(), yearly_mean.Lon.max()]
        if (lat >= bbox[0]) & (lat <= bbox[1]) & (lon >= bbox[2]) & (lon <= bbox[3]):
            point = yearly_mean.sel(Lat = lat, Lon= lon, method='nearest')
            s = point['PredNO2'].to_series().reset_index()
            df = pd.concat([df, s])
    return df       
             
def daily_concentration(lat, lon):
    folder = "app/static/data/Pred_Y/"                    
    list_file = os.listdir(folder) 
    df = pd.DataFrame() 

    for f in list_file:
        file_path = folder + f
        daily_concetration = xr.open_dataset(file_path,  engine='netcdf4')
        point = daily_concetration.sel(Lat = lat, Lon= lon, method='nearest')
        s = point['PredNO2'].to_series().reset_index()
        s['time'] = s.time.apply(lambda x : x.strftime('%Y-%m-%d'))
        df = pd.concat([df, s]) 
    return df

### When clicking in one of the province, retrieve the shape of the province, retrieve data to GCS and plot the times serie of average concentration in the province. 
def health_indicator(poly_coor, poly_type):
    folder = "app/static/data/Pred_Y_Indic/"
    list_file = os.listdir(folder)
    df = pd.DataFrame()
    for f in list_file:   
        file_path = folder + f
        ds = xr.open_dataset(file_path,  engine='netcdf4')
        ds.rio.write_crs("epsg:4326", inplace=True)

        geometries = [
            {
                'type': poly_type,
                'coordinates': poly_coor
            }
        ]
                  
        bbox = [ds.Lat.min(), ds.Lat.max(), ds.Lon.min(), ds.Lon.max()]

        if (test_inbound(geometries[0]['coordinates'], geometries[0]['type'], bbox)):
            ds = ds.rio.clip(geometries, from_disk=True)
            percent_good = ds['good'].sum()/ds['PopDensity'].sum()
            percent_moderate = ds['moderate'].sum()/ds['PopDensity'].sum()
            percent_poor = ds['poor'].sum()/ds['PopDensity'].sum()
            percent_very_poor = ds['very_poor'].sum()/ds['PopDensity'].sum()
            percent_severe = ds['severe'].sum()/ds['PopDensity'].sum()
            
            s = pd.DataFrame({ 'Good' :[percent_good.item()], 'Moderate' :[percent_moderate.item()], 'Poor' :[percent_poor.item()], 'Very_Poor' :[percent_very_poor.item()], 'Severe' :[percent_severe.item()] })
            df = pd.concat([df, s])     
    return df


def test_inbound(poly_coordinate, poly_type, bbox): # bbox = [lat_min, lat_max, lon_min, lon_max]
    lat_min = bbox[0]
    lat_max = bbox[1]
    lon_min = bbox[2]
    lon_max = bbox[3]

    if poly_type == 'MultiPolygon' :
        for coor in poly_coordinate :
            d = pd.DataFrame(coor[0], columns=['Lon', 'Lat'])
            if (d.Lon.min() <  lon_min) | (d.Lon.max() > lon_max) | (d.Lat.min() <  lat_min) | (d.Lat.max() >  lat_max):
                return False

        return True

    elif poly_type == 'Polygon':
        d = pd.DataFrame(poly_coordinate[0], columns=['Lon', 'Lat'])
        if (d.Lon.min() <  lon_min) | (d.Lon.max() > lon_max) | (d.Lat.min() <  lat_min) | (d.Lat.max() >  lat_max):
            return False
        return True
                                                                


def format_to_dollar(number: str) -> str:
    formatted_number = re.sub(r'(\d)(?=(\d{3})+(?!\d))', r'\1,', number)
    return f"${formatted_number}"