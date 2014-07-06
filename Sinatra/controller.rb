require "sinatra/jsonp"

Pusher.url = "http://8c0bcee100b50a1d7826:6e64b8424aee60e380dd@api.pusherapp.com/apps/79094"
get '/' do
  "Hello World"
end

get '/online_users' do 
	jsonp User.where(online: true).to_json
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
		u = User.create(email: params[:email], password: params[:password])
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
	g = Game.create(name: params[:name])
	jsonp g.to_json
end

get "/games" do 
	jsonp Game.all.to_json
end

get "/game" do
	jsonp Game.find(params[:id].to_i).to_json
end

get "/game_players" do
	logger.info params.inspect
	g = Game.find(params[:id])
	users = []
	g.players.each do |p|
		users.push User.find(p.user_id)
	end
	jsonp users.to_json
end

post "/remove_user_to_game" do
	logger.info params.inspect
	jsonp ["Successful"]
end

post "/add_user_to_game" do
	logger.info params.inspect
	jsonp ["Successful"]
end

post "/chat" do 
	logger.info params.inspect
	m = Message.create(username: User.find(params[:user_id]).name, game: Game.find(params[:game_id]), data: params[:data])
	channel_str = 'test_channel_'+params[:game_id]
	Pusher[channel_str].trigger('my_event',{ message: m.data, username: m.username})
	channel_str
end