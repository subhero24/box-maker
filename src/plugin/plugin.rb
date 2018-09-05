require 'sketchup.rb'
require 'extensions.rb'

module BVDSoftware
	module BoxMaker
		if not file_loaded?(__FILE__)
			extension = SketchupExtension.new('Box Maker', 'box-maker/main')
			extension.version = "0.0.2"
			extension.creator = 'BVDSoftware'
			extension.description = "Let's make a box"
			Sketchup.register_extension(extension, true)

			file_loaded(__FILE__)
		end
	end
end
