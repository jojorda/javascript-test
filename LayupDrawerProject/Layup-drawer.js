
'use strict';

function LayupDrawer() {
    /**
     * Canvas element
     */
    this.canvas = null;
}

LayupDrawer.prototype = {
    /**
     * Configure the canvas
     *
     * @param {HTMLCanvasElement} canvas  Canvas element
     */
    init: function (canvas) {
        this.canvas = canvas;
    },

    /**
     * Draw a layup configuration on the canvas
     *
     * @param {Object} layup Layup object structure
     * @param {Number} length Layup length in mm
     */
    drawLayup: function (layup, length) {
        if (!this.canvas) {
            console.error('Canvas is not initialized. Call init() method first.');
            return;
        }

        const context = this.canvas.getContext('2d');
        const centerX = this.canvas.width / 2;
        const centerY = this.canvas.height / 2;
        const radius = Math.min(centerX, centerY) - 10; 

        context.clearRect(0, 0, this.canvas.width, this.canvas.height);

        let currentAngle = 0;

        for (const layer in layup) {
            if (layup.hasOwnProperty(layer)) {
                const currentLayer = layup[layer];
                const layerLength = (currentLayer.thickness / length) * radius;

                context.beginPath();
                context.arc(centerX, centerY, radius, this.toRadians(currentAngle), this.toRadians(currentAngle + currentLayer.angle));
                context.lineWidth = 2;
                context.strokeStyle = this.getRandomColor();
                context.stroke();

                currentAngle += currentLayer.angle;

                // Draw label
                const labelX = centerX + (radius + 20) * Math.cos(this.toRadians(currentAngle / 2));
                const labelY = centerY + (radius + 20) * Math.sin(this.toRadians(currentAngle / 2));
                context.font = '14px Arial';
                context.fillStyle = '#000';
                context.fillText(currentLayer.label, labelX, labelY);
            }
        }
    },

    /**
     * Convert degrees to radians
     *
     * @param {Number} degrees Angle in degrees
     * @returns {Number} Angle in radians
     */
    toRadians: function (degrees) {
        return degrees * (Math.PI / 180);
    },

    /**
     * Generate a random color
     *
     * @returns {String} Random color in hex format
     */
    getRandomColor: function () {
        return '#' + Math.floor(Math.random() * 16777215).toString(16);
    },
};

// Add more functions as needed
