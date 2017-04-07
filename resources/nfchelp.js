'use strict';
const test_text_data = "Test text data.";
const test_text_byte_array = new TextEncoder('utf-8').encode(test_text_data);
const test_number_data = 42;
const test_json_data = {level: 1, score: 100, label: 'Game'};
const test_url_data = "https://w3c.github.io/web-nfc";
const test_message_origin = "https://127.0.0.1:8443";
const test_buffer_data = new ArrayBuffer(test_text_byte_array.length);
const test_buffer_view = new Uint8Array(test_buffer_data).set(test_text_byte_array);

function noop() {};

function toNFCWatchMode(mode) {
  if (mode === 'web-nfc-only') {
    return nfc.NFCWatchMode.WEBNFC_ONLY;
  }
  return nfc.NFCWatchMode.ANY
}
function toNFCRecordType(type) {
  switch (type) {
    case 'text':
      return nfc.NFCRecordType.TEXT;
    case 'url':
      return nfc.NFCRecordType.URL;
    case 'json':
      return nfc.NFCRecordType.JSON;
    case 'opaque':
      return nfc.NFCRecordType.OPAQUE_RECORD;
  }
  return nfc.NFCRecordType.EMPTY;
}

function createNFCWatchOptions(url, recordType, mediaType, mode) {
  return {url, recordType, mediaType, mode}
}
function assertNFCWatchOptionsEqual(provided, received) {
  if (provided.url !== undefined) {
    assert_equals(provided.url, received.url);
  }else{
    assert_equals(received.url, '');
  }
  if (provided.mediaType !== undefined) {
    assert.equals(provided.mediaType, received.media_type);
  }else{
    assert.equals(received.media_type, '');
  }
  if (provided.mode !== undefined) {
    assert_equals(toNFCWatchMode(provided.mode), received.mode);
  }else{
    assert_equals(received.mode, nfc.NFCWatchMode.WEBNFC_ONLY);
  }
  if (provided.recordType !== undefined) {
    assert_equals(!+recevied.record_filter, true);
    assert_equals(toNFCRecordType(provided.recordType), recevied.record_filter.record_type);
  }
}

function assertNFCPushOptionsEqual(provided, received) {
  if (provided.ignoreRead !== undefined) {
    assert_equals(provided.ignoreRead, !!+received.ignore_read);
  }else{
    assert_equals(!!+received.ignore_read, true);
  }
  if (provided.timeout !== undefined) {
    assert_equals(provided.timeout, received.timeout);
  }else{
    assert_equals(received.timeout, Infinity);
  }
  if (provided.target !== undefined) {
    assert_equals(toMojoNFCPushTarget(provided.target), received.target);
  }else{
    assert_equals(received.target, nfc.NFCPushTarget.ANY);
  }
}

function createNFCPushOptions(target, timeout, ignoreRead) {
  return { target, timeout, ignoreRead };
}

function createMessage(records) {
  if (records !== undefined) {
    let message = {};
    message.data = records;
    return message;
  }
}

function createRecord(recordType, mediaType, data) {
  let record = {};
  if (recordType !== undefined) {
    record.recordType = recordType;
  }
  if (mediaType !== undefined) {
    record.mediaType = mediaType;
  }
  if (data !== undefined) {
    record.data = data;
  }
  return record;
}

function createTextRecord(text) {
  return createRecord('text', 'text/plain', text);
}

function createJsonRecord(json) {
  return createRecord('json', 'application/json', json);
}

function createOpaqueRecord(buffer) {
  return createRecord('opaque', 'application/octet-stream', buffer);
}

function createUrlRecord(url) {
  return createRecord('url', 'text/plain', url);
}
