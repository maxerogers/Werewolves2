require "sinatra/jsonp"

Pusher.url = "http://8c0bcee100b50a1d7826:6e64b8424aee60e380dd@api.pusherapp.com/apps/79094"
get '/' do
  jsonp ["Hello World"]
end

get '/online_users' do 
	jsonp User.where(online: true).pluck(:id, :username).to_json
end	

get '/login_user' do
	logger.info params.inspect
	u = User.where(:email => params[:email]).last
	return jsonp ["No Email Found"] if u.nil?
	return jsonp ["Bad Password"] unless u.authenticate(params[:password])
	u.online = true
	u.save
	jsonp u.to_json
end

get '/new_user' do
	logger.info params.inspect
	u = User.where(email: params[:email]).last
	if u.nil?
		u = User.create(email: params[:email], password: params[:password], username: params[:username])
	else
		return jsonp ["Email already registred"]
	end
	u.online = true
	u.save
	jsonp u.to_json
end

post '/sign_out' do 
	logger.info params.inspect
	u = User.where(email: params[:email]).last
	u.online = false
	u.save
	jsonp [u.online]
end

post '/new_game' do 
	logger.info params.inspect
	g = Game.create(name: params[:name], gametype: params[:gametype])
	jsonp g.to_json
end

get "/games" do 
	jsonp Game.all.to_json
end

get "/open_games" do
	jsonp Game.where(status: 'open').to_json
end

get "/game" do
	jsonp Game.find(params[:id].to_i).to_json
end

get "/game_players" do
	logger.info params.inspect
	g = Game.find(params[:id])
	logger.info g.users.to_json
	jsonp g.users.to_json
end

get "/lobby_chat" do 
	logger.info params.inspect
	jsonp Message.where(game_id: 0).pluck(:username, :data).to_json
end

post "/game/:id/join_game" do
	logger.info params.inspect
	Game.find(params[:id]).users.push User.find(params[:player_id])
	params.inspect
end

post "/game/:id/leave_game" do
	logger.info params.inspect
	Game.find(params[:id]).users.delete User.find(params[:player_id])
	params.inspect
end

post "/lobby_chat" do 
	logger.info params.inspect
	m = Message.new
	m.username = params[:username]
	m.user = User.find(params[:user_id])
	m.game_id = params[:game_id]
	m.data = params[:data]
	m.save
	jsonp ["Successful"]
end