require 'data_mapper'
require 'dm-sqlite-adapter'
DataMapper.setup(:default, ENV['DATABASE_URL'] || "sqlite3://#{Dir.pwd}/development.db")

class User
  include DataMapper::Resource  
  property :id, Serial
  property :username, String, length: 128
  property :name, String
  property :password, BCryptHash
  property :online, Boolean
end

class Game
	include DataMapper::Resource
	property :id, Serial
	property :name, String
end

DataMapper.finalize
DataMapper.auto_upgrade!