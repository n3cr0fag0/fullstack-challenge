module ComicRepresenter
  include Roar::JSON

  property :id
  property :title
  property :dates
  property :thumbnail
  property :issueNumber
  property :isbn
  property :variantDescription
  property :characters
  property :images
  property :creators
end
