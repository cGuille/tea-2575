'use strict';

const pad = require('pad');
const TransformStream = require('stream').Transform;
const LineStream = require('byline').LineStream;

class LineTransformStream extends TransformStream {
    _transform(chunk, encoding, callback) {
        const lineContent = chunk.toString(encoding !== 'buffer' ? encoding : null);

        const parts = lineContent.split(' -- ');
        const bookIdentifiers = JSON.parse(parts[0]);
        const stats = JSON.parse(parts[1]);

        const ean = bookIdentifiers.ean13;
        const pricesBatchs = stats.prices_batchs;
        const deduplicated = stats.deduplicated;

        const line = pad(13, ean) + ' ' +
                     pad(6, pricesBatchs) + ' ' +
                     pad(5, deduplicated);

        callback(null, line + "\n");
    }
}

process.stdout.on('error', function (error) {
    if (error.code === 'EPIPE') {
        process.exit(0);
    }

    throw error;
});

console.log(pad(13, 'EAN 13'), 'BATCHS', 'DEDUP');

process.stdin.pipe(new LineStream).pipe(new LineTransformStream).pipe(process.stdout);
