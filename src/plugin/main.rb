require 'json'
require 'sketchup.rb'

module BVDSoftware
	module BoxMaker
		def self.make_box
			dialog = UI::HtmlDialog.new({
				:dialog_title => 'BoxMaker',
				:preferences_key => 'be.bvdsoftware.boxmaker',
				:scrollable => true,
				:resizable => false,
				:width => 430,
				:min_width => 430,
				:max_width => 430,
				:height => 637,
				:min_height => 637,
				:max_height => 637
			})
			dialog.set_file(File.join(File.expand_path(File.dirname(__FILE__)), 'index.html'))
			dialog.add_action_callback 'message' do |dialog, message|
				geometry(JSON.parse(message))

			end
			dialog.show()
		end

		def self.geometry(data)
			model = Sketchup.active_model
			model.start_operation('Make box', true)

			unit = data['unit'] || 'mm'
			data['groups'].each do |agroup|
				group = model.active_entities.add_group
				agroup['faces'].each do |face|
					points = []
					thickness = (face['thickness'] || 0).send(unit.to_sym)
					face['points'].each do |point|
						x = (point['x'] || 0).send(unit.to_sym)
						y = (point['y'] || 0).send(unit.to_sym)
						z = (point['z'] || 0).send(unit.to_sym)
						points << [x,y,z]
					end
					face = group.entities.add_face(points)
					face.pushpull(thickness)
				end
			end
			model.commit_operation
		end

		if not file_loaded?(__FILE__)
			menu = UI.menu('Draw')
			menu.add_item('Box') { self.make_box }
			file_loaded(__FILE__)
		end
	end
end
