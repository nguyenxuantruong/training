<?php

// uncomment the following to define a path alias
// Yii::setPathOfAlias('local','path/to/local-folder');

// This is the main Web application configuration. Any writable
// CWebApplication properties can be configured here.
return array(
	'basePath'=>dirname(__FILE__).DIRECTORY_SEPARATOR.'..',
	'name'=>'My Web Application',

	// preloading 'log' component
	'preload'=>array('log'),

	// autoloading model and component classes
	'import'=>array(
		'application.models.*',
		'application.components.*',
	),

	'modules'=>array(
		// uncomment the following to enable the Gii tool
		
		'gii'=>array(
			'class'=>'system.gii.GiiModule',
			'password'=>'Enter Your Password Here',
			// If removed, Gii defaults to localhost only. Edit carefully to taste.
			'ipFilters'=>array('127.0.0.1','::1'),
		),
		
	),

	// application components
	'components'=>array(
		'user'=>array(
			// enable cookie-based authentication
			'allowAutoLogin'=>true,
		),

		'cache'=>array(
            'class'=>'system.caching.CFileCache',
        ),
		// uncomment the following to enable URLs in path-format
		
		'urlManager'=>array(
			'urlFormat'=>'path',
			'showScriptName' => false,
			'rules'=>array(
				// handle router for products
				array('products/getProducts', 'pattern'=>'api/v1/products', 'verb' => 'GET'),
				array('products/getProducts', 'pattern'=>'api/v1/json/products', 'verb' => 'GET'),
                array('products/getProductById', 'pattern'=>'api/v1/products/<id>', 'verb' => 'GET'),
                array('products/getProductById', 'pattern'=>'api/v1/json/products/<id>', 'verb' => 'GET'),
                array('products/deleteProductById', 'pattern'=>'api/v1/products/<id>', 'verb' => 'DELETE'),
				array('products/createProduct', 'pattern'=>'api/v1/products', 'verb' => 'POST'),
				array('products/updateProductById', 'pattern'=>'api/v1/products/<id>', 'verb' => 'PUT'),

				// handel router for categories
				array('products/getCategories', 'pattern'=>'api/v1/categories', 'verb' => 'GET'),
				array('products/getCategories_json', 'pattern'=>'api/v1/json/categories', 'verb' => 'GET'),
				array('products/getCategories_xml', 'pattern'=>'api/v1/xml/categories', 'verb' => 'GET'),
                array('products/getCategoryById', 'pattern'=>'api/v1/categories/<id>', 'verb' => 'GET'),
                array('products/getCategoryById_json', 'pattern'=>'api/v1/json/categories/<id>', 'verb' => 'GET'),
                array('products/getCategoryById_xml', 'pattern'=>'api/v1/xml/categories/<id>', 'verb' => 'GET'),
                array('products/deleteCategoryById', 'pattern'=>'api/v1/categories/<id>', 'verb' => 'DELETE'),
				array('products/createCategory', 'pattern'=>'api/v1/categories', 'verb' => 'POST'),
				array('products/updateCategoryById', 'pattern'=>'api/v1/categories/<id>', 'verb' => 'PUT'),
			),
		),
		
		'db'=>array(
			'connectionString' => 'sqlite:'.dirname(__FILE__).'/../data/testdrive.db',
		),
		// uncomment the following to use a MySQL database
		/*
		'db'=>array(
			'connectionString' => 'mysql:host=localhost;dbname=testdrive',
			'emulatePrepare' => true,
			'username' => 'root',
			'password' => '',
			'charset' => 'utf8',
		),
		*/
		'errorHandler'=>array(
			// use 'site/error' action to display errors
			'errorAction'=>'site/error',
		),
		'log'=>array(
			'class'=>'CLogRouter',
			'routes'=>array(
				array(
					'class'=>'CFileLogRoute',
					'levels'=>'error, warning',
				),
				// uncomment the following to show log messages on web pages
				/*
				array(
					'class'=>'CWebLogRoute',
				),
				*/
			),
		),
	),

	// application-level parameters that can be accessed
	// using Yii::app()->params['paramName']
	'params'=>array(
		// this is used in contact page
		'adminEmail'=>'webmaster@example.com',
	),
);