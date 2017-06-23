{ Model } = require 'objection'

Tag = require './Tag'
User = require './User'


/*
// Circle - subclass
function Circle(x, y, r) {
  // Call constructor of superclass to initialize superclass-derived members.
  Shape.call(this, x, y);

  // Initialize subclass's own members
  this.r = r;
}

// Circle derives from Shape
Circle.prototype = Object.create(Shape.prototype);
Circle.prototype.constructor = Circle;

*/

export Article = (...args) ->
  console.log 'args', args

  @table-name = 'articles'

  @json-schema =
    type: 'object'
    required: <[ title slug body created updated ]>
    properties:
      id:
        type: 'integer'

      title:
        type: 'string'
        min-length: 1
        max-length: 255

      slug:
        type: 'string'
        min-length: 1
        max-length: 255

      body:
        type: 'string'

      created:
        type: 'date'

      updated:
        type: 'date'

  @relation-mappings =
    user:
      relation: Model.BelongsToOneRelation
      model-class: "#{__dirname}/User"

      join:
        from: 'articles.userId'
        to: 'users.id'

    comments:
      relation: Model.HasManyRelation
      model-class: "#{__dirname}/Comment"
      join:
        from: 'articles.id'
        to: 'comments.articleId'

    tags:
      relation: Model.ManyToManyRelation
      model-class: "#{__dirname}/Tag"
      join:
        from: 'articles.id'
        through:
          from: 'articles_tags.articleId'
          to: 'articles_tags.tagId'
        to: 'tags.id'

  Model.call @, ...args

Article.prototype.get-articles = (offset, limit) ->
  @query!
    .offset offset
    .limit limit

Article.prototype.get-articles-by-user-id = (user-id, offset, limit) ->
  @query!
    .where user-id: user-id
    .offset offset
    .limit limit

Article.prototype.get-articles-by-username = (username, offset, limit) ->
  @query!
    .where username: username
    .offset offset
    .limit limit

Article.prototype.get-articles-by-email = (email, offset, limit) ->
  @query!
    .where email: email
    .offset offset
    .limit limit

Article.prototype.get-articles-by-tag = (tag, offset, limit) ->
  Tag.query!
    .where label: tag
    .then ([tag]) ->
      tag.$relatedQuery 'articles'
        .offset offset
        .limit limit

Article.prototype.get-article-by-id = (id) ->
  @query!
    .where id: id
    .then ([x]) -> x

Article.prototype.get-article-by-slug = (slug) ->
  @query!
    .where slug: slug
    .then ([x]) -> x

Article.prototype = Object.create Model.prototype
Article.prototype.constructor = Model
