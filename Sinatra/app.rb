require 'rubygems'
require 'bundler'
require 'sinatra'
require './model.rb'
require './controller.rb'


before do 
	response.headers["Access-Control-Allow-Origin"] = "*"
	response.headers["Access-Control-Allow-Methods"] = "GET, POST, PUT, DELETE, OPTIONS"	
end

