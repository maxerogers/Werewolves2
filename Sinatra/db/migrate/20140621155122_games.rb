class Games < ActiveRecord::Migration
  def change
  	create_table :games do |t|
  		t.string :name
  		t.string :gametype
  		t.string :status
  		t.integer :filled
  		t.integer :limit
  	end
  end
end
