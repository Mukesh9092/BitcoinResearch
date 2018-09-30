import fs from 'fs'
import path from 'path'

import cheerio from 'cheerio'
import { Helmet } from 'react-helmet'

// bundle path, not source path.
const bundleTemplatePath = path.resolve(`${__dirname}/../client/index.html`)

const HTML_TEMPLATE = fs.readFileSync(bundleTemplatePath).toString()

export default function generateHtml(markup) {
  const helmet = Helmet.renderStatic()

  const $template = cheerio.load(HTML_TEMPLATE)

  $template('head').append(helmet.title.toString() + helmet.meta.toString() + helmet.link.toString())
  $template('#app').html(markup)

  return $template.html()
}
