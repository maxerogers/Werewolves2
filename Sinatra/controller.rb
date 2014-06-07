require "sinatra/jsonp"
get '/' do
  "Hello World"
end

get '/online_users' do 
	jsonp User.all(online: true).to_json
end	

get '/login_user' do
	logger.info params.inspect
	u = User.last(:username => params[:email])
	return jsonp ["No Email Found"] if u.nil?
	return jsonp ["Bad Password"] if u.password != params[:password]
	u.online = true
	u.save
	jsonp u.to_json
end

get '/new_user' do
	logger.info params.inspect
	u = User.last(username: params[:email])
	if u.nil?
		u = User.create(username: params[:email], password: params[:password])
	else
		return jsonp ["Email already registred"]
	end
	u.online = true
	u.save
	jsonp u.to_json
end

post '/sign_out' do 
	logger.info params.inspect
	u = User.last(username: params[:username])
	u.online = false
	u.save
	jsonp [u.online]
end

post '/new_game' do 
	logger.info params.inspect
	g = Game.create(name: params[:name])
	jsonp g.to_json
end

get "/games" do 
	jsonp Game.all.to_json
end

get "/game" do
	jsonp Game.get(params[:id].to_i).to_json
end