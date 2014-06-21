class Players < ActiveRecord::Migration
  def change
  	create_table :players, id: false do |t|
  		t.string :role
  		t.belongs_to :user
  		t.belongs_to :game
  	end
  end
end
