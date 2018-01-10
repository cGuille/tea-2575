'use strict';

const TransformStream = require('stream').Transform;
const LineStream = require('byline').LineStream;

class LineTransformStream extends TransformStream {
    _transform(chunk, encoding, callback) {
        const lineContent = chunk.toString(encoding !== 'buffer' ? encoding : null);

        // TODO: do something with the line content

        callback(null, lineContent + "\n");
    }
}

process.stdout.on('error', function (error) {
    if (error.code === 'EPIPE') {
        process.exit(0);
    }

    throw error;
});

process.stdin.pipe(new LineStream).pipe(new LineTransformStream).pipe(process.stdout);
