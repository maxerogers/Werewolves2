class AddUserReferenceToMessages < ActiveRecord::Migration
  def change
  	change_table :messages do |m|
  		m.belongs_to :user
  	end
  end
end
