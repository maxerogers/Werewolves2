require "sinatra"
require "sinatra/activerecord"
 
set :database, "sqlite3:blog.db"
 
class User < ActiveRecord::Base
	#email:String, password:String, password_confirmation:String, online:boolean
	has_secure_password
	validates_presence_of :password, :on => :create
	has_many :players
	has_many :games, through: :players

	def init
		self.name ||= "unknown"
	end
end

class Game < ActiveRecord::Base
	#name:String, status:String
	#status = [queuing , on, over]
	has_many :players
	has_many :users, through: :players
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
	validates_presence_of :username, :data
end