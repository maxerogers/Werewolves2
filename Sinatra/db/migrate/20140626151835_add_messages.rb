class AddMessages < ActiveRecord::Migration
  def change
  	create_table :messages do |t|
  		t.string :data
  		t.string :username
  		t.belongs_to :game
  	end
  end
end
