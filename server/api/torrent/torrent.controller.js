'use strict';

var _ = require('lodash');
var Torrent = require('./torrent.model');

// Get list of torrents
exports.index = function(req, res) {
  Torrent.find(function (err, torrents) {
    if(err) { return handleError(res, err); }
    return res.json(200, torrents);
  });
};

// Get a single torrent
exports.show = function(req, res) {
  Torrent.findById(req.params.id, function (err, torrent) {
    if(err) { return handleError(res, err); }
    if(!torrent) { return res.send(404); }
    return res.json(torrent);
  });
};

// Creates a new torrent in the DB.
exports.create = function(req, res) {
  Torrent.create(req.body, function(err, torrent) {
    if(err) { return handleError(res, err); }
    return res.json(201, torrent);
  });
};

// Updates an existing torrent in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Torrent.findById(req.params.id, function (err, torrent) {
    if (err) { return handleError(res, err); }
    if(!torrent) { return res.send(404); }
    var updated = _.merge(torrent, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.json(200, torrent);
    });
  });
};

// Deletes a torrent from the DB.
exports.destroy = function(req, res) {
  Torrent.findById(req.params.id, function (err, torrent) {
    if(err) { return handleError(res, err); }
    if(!torrent) { return res.send(404); }
    torrent.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.send(204);
    });
  });
};

function handleError(res, err) {
  return res.send(500, err);
}