require "jekyll"
require "ruby-prof"


result = RubyProf.profile do

  options = {
      "source"      => './',
      "destination" => './_site',
      "livereload"  => true,
      'watch' => true,
      'verbose' => true
    }

  # serve(@standard_options)
  # Jekyll::Command::process_with_graceful_fail({}, @standard_options, Jekyll::Commands::Build,Jekyll::Commands::Serve)
  # Jekyll::Commands::Build.process(standard_options)
  # Jekyll::Commands::Serve.process(standard_options)
  # klass = [Jekyll::Commands::Build, Jekyll::Commands::Serve]
  # klass.each { |k| k.process(options) if k.respond_to?(:process) }

  Jekyll::Commands::Build.process(options)
end

stack_printer = RubyProf::CallStackPrinter.new(result)
flat_printer = RubyProf::FlatPrinter.new(result)
graph_printer = RubyProf::GraphHtmlPrinter.new(result)

File.open("_profile_stack.html", 'w') { |file| stack_printer.print(file) }
File.open("_profile_flat.txt", 'w') { |file| flat_printer.print(file) }
File.open("_profile_graph.html", 'w') { |file| graph_printer.print(file) }