require "sinatra"
require "sinatra/activerecord"
 
set :database, "sqlite3:blog.db"
 
class User < ActiveRecord::Base
	#email:String, password:String, password_confirmation:String, online:boolean
	has_secure_password
	validates_presence_of :password, :on => :create
	has_many :players
	has_many :games, through: :players

	after_initialize :init
	def init
		self.username ||= "unknown"
		self.online = true
	end
end

class Game < ActiveRecord::Base
	#name:String, status:String, limi:int, type:string
	#status = [queuing , on, over]
	has_many :players
	has_many :users, through: :players

	after_initialize :init
	
	def init
		self.status ||= "open"
		self.limit ||= 12
		self.filled ||= 0
		self.gametype ||= "werewolves"
	end
end

class Player < ActiveRecord::Base
	belongs_to :game
	belongs_to :user

	after_initialize :init

    def init
      self.role  ||= "unknown"
    end
end

class Message < ActiveRecord::Base
	belongs_to :game
	belongs_to :user
	validates_presence_of :username, :data
end