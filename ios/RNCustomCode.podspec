
Pod::Spec.new do |s|
  s.name         = "RNCustomCode"
  s.version      = "1.0.0"
  s.summary      = "RNCustomCode"
  s.homepage     = "appboss.com"
  s.license      = "MIT"
  s.author       = { "appboss" => "appboss1@gmail.com" }
  s.platform     = :ios, "7.0"
  s.source       = { :git => "https://github.com/author/RNCustomCode.git", :tag => "master" }
  s.source_files  = "*.{h,m}"
  s.requires_arc = true


  s.dependency "React"

end

