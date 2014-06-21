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
  has n, :players
  has n, :games, through: :players
end

class Game
	include DataMapper::Resource
	property :id, Serial
	property :name, String
	has n, :players
	has n, :users, thrugh: :players
end

class Player
	include DataMapper::Resource
	property :role, String
	belongs_to :user, key: true 
	belongs_to :game, key: true
end

DataMapper.finalize
DataMapper.auto_upgrade!