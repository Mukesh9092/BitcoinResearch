import FeedParser from 'node-feedparser'
import H from 'highland'
import JSONStream from 'JSONStream'
import eventstore from 'geteventstore-promise'
import fetch from 'cross-fetch'
import uuid from 'uuid/v4'

import { formatError } from '../../common/errors'
import { log } from '../../common/log'

const {
  EVENTSTORE_HOST,
  EVENTSTORE_PORT,
  EVENTSTORE_HTTP_PORT,
  EVENTSTORE_USERNAME,
  EVENTSTORE_PASSWORD,
} = process.env

const EVENTSTORE_CONTENT_TYPE_GET = 'application/vnd.eventstore.atom+json'
const EVENTSTORE_CONTENT_TYPE_POST = 'application/vnd.eventstore.events+json'

export function createEvent(eventType, data, eventId = uuid()) {
  return {
    eventId,
    eventType,
    data,
  }
}

export async function writeEvents(streamName, events) {
  try {
    const uri = `http://${EVENTSTORE_HOST}:${EVENTSTORE_HTTP_PORT}/streams/${streamName}`
    const options = {
      method: 'POST',
      headers: {
        Accept: EVENTSTORE_CONTENT_TYPE_POST,
        'Content-Type': EVENTSTORE_CONTENT_TYPE_POST,
      },
      body: JSON.stringify(events),
    }

    await fetch(uri, options)
  } catch (error) {
    console.error(formatError(error))
  }
}

export async function writeMessage(streamName, eventType, data) {
  await writeEvents(streamName, [createEvent(eventType, data)])
}

export async function parseBody(body) {
  const bodyBuffer = await H(body)
    .reduce1((x, y) => x + y)
    .toPromise(Promise)

  return JSON.parse(bodyBuffer.toString())
}

export async function readEventsPage(
  streamName,
  pageNumber,
  pageDirection,
  pageItemCount,
) {
  try {
    const uri = `http://${EVENTSTORE_HOST}:${EVENTSTORE_HTTP_PORT}/streams/${streamName}`
    const options = {
      method: 'GET',
      headers: {
        Accept: EVENTSTORE_CONTENT_TYPE_POST,
        'Content-Type': EVENTSTORE_CONTENT_TYPE_POST,
      },
    }

    const response = await fetch(uri, options)
    const parsedBody = await parseBody(response.body)

    log.debug('parsedBody', parsedBody)

    // return parsedBody;
  } catch (error) {
    console.error(formatError(error))
  }
}

export async function readEvents(streamName) {
  try {
    const output = H()

    const firstPage = await readEventsPage(streamName, 0, 'forward', 20)

    // log.debug('first page', firstPage);

    return output
  } catch (error) {
    console.error(formatError(error))
  }
}
