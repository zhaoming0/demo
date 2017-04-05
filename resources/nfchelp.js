'use strict';
const test_message_origin = "https//127.0.0.1:8443";
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
  return {url, recordType, mediaType, mode};
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
