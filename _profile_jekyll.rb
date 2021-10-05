require "mercenary"
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
  klass = [Jekyll::Commands::Build, Jekyll::Commands::Serve]
  klass.each { |k| k.process(options) if k.respond_to?(:process) }

end

printer = RubyProf::CallStackPrinter.new(result)

File.open("_profile.html", 'w') { |file| printer.print(file) }