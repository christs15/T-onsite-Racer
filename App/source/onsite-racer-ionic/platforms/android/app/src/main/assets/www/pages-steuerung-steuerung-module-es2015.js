(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["pages-steuerung-steuerung-module"],{

/***/ "./node_modules/nipplejs/dist/nipplejs.js":
/*!************************************************!*\
  !*** ./node_modules/nipplejs/dist/nipplejs.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

(function(f){if(true){module.exports=f()}else { var g; }})(function(){var define,module,exports;
'use strict';

// Constants
var isTouch = !!('ontouchstart' in window);
var isPointer = window.PointerEvent ? true : false;
var isMSPointer = window.MSPointerEvent ? true : false;
var events = {
    touch: {
        start: 'touchstart',
        move: 'touchmove',
        end: 'touchend, touchcancel'
    },
    mouse: {
        start: 'mousedown',
        move: 'mousemove',
        end: 'mouseup'
    },
    pointer: {
        start: 'pointerdown',
        move: 'pointermove',
        end: 'pointerup'
    },
    MSPointer: {
        start: 'MSPointerDown',
        move: 'MSPointerMove',
        end: 'MSPointerUp'
    }
};
var toBind;
var secondBind = {};
if (isPointer) {
    toBind = events.pointer;
} else if (isMSPointer) {
    toBind = events.MSPointer;
} else if (isTouch) {
    toBind = events.touch;
    secondBind = events.mouse;
} else {
    toBind = events.mouse;
}

///////////////////////
///      UTILS      ///
///////////////////////

var u = {};
u.distance = function (p1, p2) {
    var dx = p2.x - p1.x;
    var dy = p2.y - p1.y;

    return Math.sqrt((dx * dx) + (dy * dy));
};

u.angle = function(p1, p2) {
    var dx = p2.x - p1.x;
    var dy = p2.y - p1.y;

    return u.degrees(Math.atan2(dy, dx));
};

u.findCoord = function(p, d, a) {
    var b = {x: 0, y: 0};
    a = u.radians(a);
    b.x = p.x - d * Math.cos(a);
    b.y = p.y - d * Math.sin(a);
    return b;
};

u.radians = function(a) {
    return a * (Math.PI / 180);
};

u.degrees = function(a) {
    return a * (180 / Math.PI);
};

u.bindEvt = function (el, arg, handler) {
    var types = arg.split(/[ ,]+/g);
    var type;
    for (var i = 0; i < types.length; i += 1) {
        type = types[i];
        if (el.addEventListener) {
            el.addEventListener(type, handler, false);
        } else if (el.attachEvent) {
            el.attachEvent(type, handler);
        }
    }
};

u.unbindEvt = function (el, arg, handler) {
    var types = arg.split(/[ ,]+/g);
    var type;
    for (var i = 0; i < types.length; i += 1) {
        type = types[i];
        if (el.removeEventListener) {
            el.removeEventListener(type, handler);
        } else if (el.detachEvent) {
            el.detachEvent(type, handler);
        }
    }
};

u.trigger = function (el, type, data) {
    var evt = new CustomEvent(type, data);
    el.dispatchEvent(evt);
};

u.prepareEvent = function (evt) {
    evt.preventDefault();
    return evt.type.match(/^touch/) ? evt.changedTouches : evt;
};

u.getScroll = function () {
    var x = (window.pageXOffset !== undefined) ?
        window.pageXOffset :
        (document.documentElement || document.body.parentNode || document.body)
            .scrollLeft;

    var y = (window.pageYOffset !== undefined) ?
        window.pageYOffset :
        (document.documentElement || document.body.parentNode || document.body)
            .scrollTop;
    return {
        x: x,
        y: y
    };
};

u.applyPosition = function (el, pos) {
    if (pos.x && pos.y) {
        el.style.left = pos.x + 'px';
        el.style.top = pos.y + 'px';
    } else if (pos.top || pos.right || pos.bottom || pos.left) {
        el.style.top = pos.top;
        el.style.right = pos.right;
        el.style.bottom = pos.bottom;
        el.style.left = pos.left;
    }
};

u.getTransitionStyle = function (property, values, time) {
    var obj = u.configStylePropertyObject(property);
    for (var i in obj) {
        if (obj.hasOwnProperty(i)) {
            if (typeof values === 'string') {
                obj[i] = values + ' ' + time;
            } else {
                var st = '';
                for (var j = 0, max = values.length; j < max; j += 1) {
                    st += values[j] + ' ' + time + ', ';
                }
                obj[i] = st.slice(0, -2);
            }
        }
    }
    return obj;
};

u.getVendorStyle = function (property, value) {
    var obj = u.configStylePropertyObject(property);
    for (var i in obj) {
        if (obj.hasOwnProperty(i)) {
            obj[i] = value;
        }
    }
    return obj;
};

u.configStylePropertyObject = function (prop) {
    var obj = {};
    obj[prop] = '';
    var vendors = ['webkit', 'Moz', 'o'];
    vendors.forEach(function (vendor) {
        obj[vendor + prop.charAt(0).toUpperCase() + prop.slice(1)] = '';
    });
    return obj;
};

u.extend = function (objA, objB) {
    for (var i in objB) {
        if (objB.hasOwnProperty(i)) {
            objA[i] = objB[i];
        }
    }
    return objA;
};

// Overwrite only what's already present
u.safeExtend = function (objA, objB) {
    var obj = {};
    for (var i in objA) {
        if (objA.hasOwnProperty(i) && objB.hasOwnProperty(i)) {
            obj[i] = objB[i];
        } else if (objA.hasOwnProperty(i)) {
            obj[i] = objA[i];
        }
    }
    return obj;
};

// Map for array or unique item.
u.map = function (ar, fn) {
    if (ar.length) {
        for (var i = 0, max = ar.length; i < max; i += 1) {
            fn(ar[i]);
        }
    } else {
        fn(ar);
    }
};

///////////////////////
///   SUPER CLASS   ///
///////////////////////

function Super () {};

// Basic event system.
Super.prototype.on = function (arg, cb) {
    var self = this;
    var types = arg.split(/[ ,]+/g);
    var type;
    self._handlers_ = self._handlers_ || {};

    for (var i = 0; i < types.length; i += 1) {
        type = types[i];
        self._handlers_[type] = self._handlers_[type] || [];
        self._handlers_[type].push(cb);
    }
    return self;
};

Super.prototype.off = function (type, cb) {
    var self = this;
    self._handlers_ = self._handlers_ || {};

    if (type === undefined) {
        self._handlers_ = {};
    } else if (cb === undefined) {
        self._handlers_[type] = null;
    } else if (self._handlers_[type] &&
            self._handlers_[type].indexOf(cb) >= 0) {
        self._handlers_[type].splice(self._handlers_[type].indexOf(cb), 1);
    }

    return self;
};

Super.prototype.trigger = function (arg, data) {
    var self = this;
    var types = arg.split(/[ ,]+/g);
    var type;
    self._handlers_ = self._handlers_ || {};

    for (var i = 0; i < types.length; i += 1) {
        type = types[i];
        if (self._handlers_[type] && self._handlers_[type].length) {
            self._handlers_[type].forEach(function (handler) {
                handler.call(self, {
                    type: type,
                    target: self
                }, data);
            });
        }
    }
};

// Configuration
Super.prototype.config = function (options) {
    var self = this;
    self.options = self.defaults || {};
    if (options) {
        self.options = u.safeExtend(self.options, options);
    }
};

// Bind internal events.
Super.prototype.bindEvt = function (el, type) {
    var self = this;
    self._domHandlers_ = self._domHandlers_ || {};

    self._domHandlers_[type] = function () {
        if (typeof self['on' + type] === 'function') {
            self['on' + type].apply(self, arguments);
        } else {
            console.warn('[WARNING] : Missing "on' + type + '" handler.');
        }
    };

    u.bindEvt(el, toBind[type], self._domHandlers_[type]);

    if (secondBind[type]) {
        // Support for both touch and mouse at the same time.
        u.bindEvt(el, secondBind[type], self._domHandlers_[type]);
    }

    return self;
};

// Unbind dom events.
Super.prototype.unbindEvt = function (el, type) {
    var self = this;
    self._domHandlers_ = self._domHandlers_ || {};

    u.unbindEvt(el, toBind[type], self._domHandlers_[type]);

    if (secondBind[type]) {
        // Support for both touch and mouse at the same time.
        u.unbindEvt(el, secondBind[type], self._domHandlers_[type]);
    }

    delete self._domHandlers_[type];

    return this;
};

///////////////////////
///   THE NIPPLE    ///
///////////////////////

function Nipple (collection, options) {
    this.identifier = options.identifier;
    this.position = options.position;
    this.frontPosition = options.frontPosition;
    this.collection = collection;

    // Defaults
    this.defaults = {
        size: 100,
        threshold: 0.1,
        color: 'white',
        fadeTime: 250,
        dataOnly: false,
        restJoystick: true,
        restOpacity: 0.5,
        mode: 'dynamic',
        zone: document.body
    };

    this.config(options);

    // Overwrites
    if (this.options.mode === 'dynamic') {
        this.options.restOpacity = 0;
    }

    this.id = Nipple.id;
    Nipple.id += 1;
    this.buildEl()
        .stylize();

    // Nipple's API.
    this.instance = {
        el: this.ui.el,
        on: this.on.bind(this),
        off: this.off.bind(this),
        show: this.show.bind(this),
        hide: this.hide.bind(this),
        add: this.addToDom.bind(this),
        remove: this.removeFromDom.bind(this),
        destroy: this.destroy.bind(this),
        resetDirection: this.resetDirection.bind(this),
        computeDirection: this.computeDirection.bind(this),
        trigger: this.trigger.bind(this),
        position: this.position,
        frontPosition: this.frontPosition,
        ui: this.ui,
        identifier: this.identifier,
        id: this.id,
        options: this.options
    };

    return this.instance;
};

Nipple.prototype = new Super();
Nipple.constructor = Nipple;
Nipple.id = 0;

// Build the dom element of the Nipple instance.
Nipple.prototype.buildEl = function (options) {
    this.ui = {};

    if (this.options.dataOnly) {
        return this;
    }

    this.ui.el = document.createElement('div');
    this.ui.back = document.createElement('div');
    this.ui.front = document.createElement('div');

    this.ui.el.className = 'nipple collection_' + this.collection.id;
    this.ui.back.className = 'back';
    this.ui.front.className = 'front';

    this.ui.el.setAttribute('id', 'nipple_' + this.collection.id +
        '_' + this.id);

    this.ui.el.appendChild(this.ui.back);
    this.ui.el.appendChild(this.ui.front);

    return this;
};

// Apply CSS to the Nipple instance.
Nipple.prototype.stylize = function () {
    if (this.options.dataOnly) {
        return this;
    }
    var animTime = this.options.fadeTime + 'ms';
    var borderStyle = u.getVendorStyle('borderRadius', '50%');
    var transitStyle = u.getTransitionStyle('transition', 'opacity', animTime);
    var styles = {};
    styles.el = {
        position: 'absolute',
        opacity: this.options.restOpacity,
        display: 'block',
        'zIndex': 999
    };

    styles.back = {
        position: 'absolute',
        display: 'block',
        width: this.options.size + 'px',
        height: this.options.size + 'px',
        marginLeft: -this.options.size / 2 + 'px',
        marginTop: -this.options.size / 2 + 'px',
        background: this.options.color,
        'opacity': '.5'
    };

    styles.front = {
        width: this.options.size / 2 + 'px',
        height: this.options.size / 2 + 'px',
        position: 'absolute',
        display: 'block',
        marginLeft: -this.options.size / 4 + 'px',
        marginTop: -this.options.size / 4 + 'px',
        background: this.options.color,
        'opacity': '.5'
    };

    u.extend(styles.el, transitStyle);
    u.extend(styles.back, borderStyle);
    u.extend(styles.front, borderStyle);

    this.applyStyles(styles);

    return this;
};

Nipple.prototype.applyStyles = function (styles) {
    // Apply styles
    for (var i in this.ui) {
        if (this.ui.hasOwnProperty(i)) {
            for (var j in styles[i]) {
                this.ui[i].style[j] = styles[i][j];
            }
        }
    }

    return this;
};

// Inject the Nipple instance into DOM.
Nipple.prototype.addToDom = function () {
    // We're not adding it if we're dataOnly or already in dom.
    if (this.options.dataOnly || document.body.contains(this.ui.el)) {
        return this;
    }
    this.options.zone.appendChild(this.ui.el);
    return this;
};

// Remove the Nipple instance from DOM.
Nipple.prototype.removeFromDom = function () {
    if (this.options.dataOnly || !document.body.contains(this.ui.el)) {
        return this;
    }
    this.options.zone.removeChild(this.ui.el);
    return this;
};

// Entirely destroy this nipple
Nipple.prototype.destroy = function () {
    clearTimeout(this.removeTimeout);
    clearTimeout(this.showTimeout);
    clearTimeout(this.restTimeout);
    this.trigger('destroyed', this.instance);
    this.removeFromDom();
    this.off();
};

// Fade in the Nipple instance.
Nipple.prototype.show = function (cb) {
    var self = this;

    if (self.options.dataOnly) {
        return self;
    }

    clearTimeout(self.removeTimeout);
    clearTimeout(self.showTimeout);
    clearTimeout(self.restTimeout);

    self.addToDom();

    self.restCallback();

    setTimeout(function () {
        self.ui.el.style.opacity = 1;
    }, 0);

    self.showTimeout = setTimeout(function () {
        self.trigger('shown', self.instance);
        if (typeof cb === 'function') {
            cb.call(this);
        }
    }, self.options.fadeTime);

    return self;
};

// Fade out the Nipple instance.
Nipple.prototype.hide = function (cb) {
    var self = this;

    if (self.options.dataOnly) {
        return self;
    }

    self.ui.el.style.opacity = self.options.restOpacity;

    clearTimeout(self.removeTimeout);
    clearTimeout(self.showTimeout);
    clearTimeout(self.restTimeout);

    self.removeTimeout = setTimeout(
        function () {
            var display = self.options.mode === 'dynamic' ? 'none' : 'block';
            self.ui.el.style.display = display;
            if (typeof cb === 'function') {
                cb.call(self);
            }

            self.trigger('hidden', self.instance);
        },
        self.options.fadeTime
    );
    if (self.options.restJoystick) {
        self.restPosition();
    }

    return self;
};

Nipple.prototype.restPosition = function (cb) {
    var self = this;
    self.frontPosition = {
        x: 0,
        y: 0
    };
    var animTime = self.options.fadeTime + 'ms';

    var transitStyle = {};
    transitStyle.front = u.getTransitionStyle('transition',
        ['top', 'left'], animTime);

    var styles = {front: {}};
    styles.front = {
        left: self.frontPosition.x + 'px',
        top: self.frontPosition.y + 'px'
    };

    self.applyStyles(transitStyle);
    self.applyStyles(styles);

    self.restTimeout = setTimeout(
        function () {
            if (typeof cb === 'function') {
                cb.call(self);
            }
            self.restCallback();
        },
        self.options.fadeTime
    );
};

Nipple.prototype.restCallback = function () {
    var self = this;
    var transitStyle = {};
    transitStyle.front = u.getTransitionStyle('transition', 'none', '');
    self.applyStyles(transitStyle);
    self.trigger('rested', self.instance);
};

Nipple.prototype.resetDirection = function () {
    // Fully rebuild the object to let the iteration possible.
    this.direction = {
        x: false,
        y: false,
        angle: false
    };
};

Nipple.prototype.computeDirection = function (obj) {
    var rAngle = obj.angle.radian;
    var angle45 = Math.PI / 4;
    var angle90 = Math.PI / 2;
    var direction, directionX, directionY;

    // Angular direction
    //     \  UP /
    //      \   /
    // LEFT       RIGHT
    //      /   \
    //     /DOWN \
    //
    if (rAngle > angle45 && rAngle < (angle45 * 3)) {
        direction = 'up';
    } else if (rAngle > -angle45 && rAngle <= angle45) {
        direction = 'left';
    } else if (rAngle > (-angle45 * 3) && rAngle <= -angle45) {
        direction = 'down';
    } else {
        direction = 'right';
    }

    // Plain direction
    //    UP                 |
    // _______               | RIGHT
    //                  LEFT |
    //   DOWN                |
    if (rAngle > -angle90 && rAngle < angle90) {
        directionX = 'left';
    } else {
        directionX = 'right';
    }

    if (rAngle > 0) {
        directionY = 'up';
    } else {
        directionY = 'down';
    }

    if (obj.force > this.options.threshold) {
        var oldDirection = {};
        for (var i in this.direction) {
            if (this.direction.hasOwnProperty(i)) {
                oldDirection[i] = this.direction[i];
            }
        }

        var same = {};

        this.direction = {
            x: directionX,
            y: directionY,
            angle: direction
        };

        obj.direction = this.direction;

        for (var i in oldDirection) {
            if (oldDirection[i] === this.direction[i]) {
                same[i] = true;
            }
        }

        // If all 3 directions are the same, we don't trigger anything.
        if (same.x && same.y && same.angle) {
            return obj;
        }

        if (!same.x || !same.y) {
            this.trigger('plain', obj);
        }

        if (!same.x) {
            this.trigger('plain:' + directionX, obj);
        }

        if (!same.y) {
            this.trigger('plain:' + directionY, obj);
        }

        if (!same.angle) {
            this.trigger('dir dir:' + direction, obj);
        }
    }
    return obj;
};

/* global Nipple, Super */

///////////////////////////
///   THE COLLECTION    ///
///////////////////////////

function Collection (manager, options) {
    var self = this;
    self.nipples = [];
    self.idles = [];
    self.actives = [];
    self.ids = [];
    self.pressureIntervals = {};
    self.manager = manager;
    self.id = Collection.id;
    Collection.id += 1;

    // Defaults
    self.defaults = {
        zone: document.body,
        multitouch: false,
        maxNumberOfNipples: 10,
        mode: 'dynamic',
        position: {top: 0, left: 0},
        catchDistance: 200,
        size: 100,
        threshold: 0.1,
        color: 'white',
        fadeTime: 250,
        dataOnly: false,
        restJoystick: true,
        restOpacity: 0.5
    };

    self.config(options);

    // Overwrites
    if (self.options.mode === 'static' || self.options.mode === 'semi') {
        self.options.multitouch = false;
    }

    if (!self.options.multitouch) {
        self.options.maxNumberOfNipples = 1;
    }

    self.updateBox();
    self.prepareNipples();
    self.bindings();
    self.begin();

    return self.nipples;
}

Collection.prototype = new Super();
Collection.constructor = Collection;
Collection.id = 0;

Collection.prototype.prepareNipples = function () {
    var self = this;
    var nips = self.nipples;

    // Public API Preparation.
    nips.on = self.on.bind(self);
    nips.off = self.off.bind(self);
    nips.options = self.options;
    nips.destroy = self.destroy.bind(self);
    nips.ids = self.ids;
    nips.id = self.id;
    nips.processOnMove = self.processOnMove.bind(self);
    nips.processOnEnd = self.processOnEnd.bind(self);
    nips.get = function (id) {
        if (id === undefined) {
            return nips[0];
        }
        for (var i = 0, max = nips.length; i < max; i += 1) {
            if (nips[i].identifier === id) {
                return nips[i];
            }
        }
        return false;
    };
};

Collection.prototype.bindings = function () {
    var self = this;
    // Touch start event.
    self.bindEvt(self.options.zone, 'start');
    // Avoid native touch actions (scroll, zoom etc...) on the zone.
    self.options.zone.style.touchAction = 'none';
    self.options.zone.style.msTouchAction = 'none';
};

Collection.prototype.begin = function () {
    var self = this;
    var opts = self.options;

    // We place our static nipple
    // if needed.
    if (opts.mode === 'static') {
        var nipple = self.createNipple(
            opts.position,
            self.manager.getIdentifier()
        );
        // Add it to the dom.
        nipple.add();
        // Store it in idles.
        self.idles.push(nipple);
    }
};

// Nipple Factory
Collection.prototype.createNipple = function (position, identifier) {
    var self = this;
    var scroll = u.getScroll();
    var toPutOn = {};
    var opts = self.options;

    if (position.x && position.y) {
        toPutOn = {
            x: position.x -
                (scroll.x + self.box.left),
            y: position.y -
                (scroll.y + self.box.top)
        };
    } else if (
            position.top ||
            position.right ||
            position.bottom ||
            position.left
        ) {

        // We need to compute the position X / Y of the joystick.
        var dumb = document.createElement('DIV');
        dumb.style.display = 'hidden';
        dumb.style.top = position.top;
        dumb.style.right = position.right;
        dumb.style.bottom = position.bottom;
        dumb.style.left = position.left;
        dumb.style.position = 'absolute';

        opts.zone.appendChild(dumb);
        var dumbBox = dumb.getBoundingClientRect();
        opts.zone.removeChild(dumb);

        toPutOn = position;
        position = {
            x: dumbBox.left + scroll.x,
            y: dumbBox.top + scroll.y
        };
    }

    var nipple = new Nipple(self, {
        color: opts.color,
        size: opts.size,
        threshold: opts.threshold,
        fadeTime: opts.fadeTime,
        dataOnly: opts.dataOnly,
        restJoystick: opts.restJoystick,
        restOpacity: opts.restOpacity,
        mode: opts.mode,
        identifier: identifier,
        position: position,
        zone: opts.zone,
        frontPosition: {
            x: 0,
            y: 0
        }
    });

    if (!opts.dataOnly) {
        u.applyPosition(nipple.ui.el, toPutOn);
        u.applyPosition(nipple.ui.front, nipple.frontPosition);
    }
    self.nipples.push(nipple);
    self.trigger('added ' + nipple.identifier + ':added', nipple);
    self.manager.trigger('added ' + nipple.identifier + ':added', nipple);

    self.bindNipple(nipple);

    return nipple;
};

Collection.prototype.updateBox = function () {
    var self = this;
    self.box = self.options.zone.getBoundingClientRect();
};

Collection.prototype.bindNipple = function (nipple) {
    var self = this;
    var type;
    // Bubble up identified events.
    var handler = function (evt, data) {
        // Identify the event type with the nipple's id.
        type = evt.type + ' ' + data.id + ':' + evt.type;
        self.trigger(type, data);
    };

    // When it gets destroyed.
    nipple.on('destroyed', self.onDestroyed.bind(self));

    // Other events that will get bubbled up.
    nipple.on('shown hidden rested dir plain', handler);
    nipple.on('dir:up dir:right dir:down dir:left', handler);
    nipple.on('plain:up plain:right plain:down plain:left', handler);
};

Collection.prototype.pressureFn = function (touch, nipple, identifier) {
    var self = this;
    var previousPressure = 0;
    clearInterval(self.pressureIntervals[identifier]);
    // Create an interval that will read the pressure every 100ms
    self.pressureIntervals[identifier] = setInterval(function () {
        var pressure = touch.force || touch.pressure ||
            touch.webkitForce || 0;
        if (pressure !== previousPressure) {
            nipple.trigger('pressure', pressure);
            self.trigger('pressure ' +
                nipple.identifier + ':pressure', pressure);
            previousPressure = pressure;
        }
    }.bind(self), 100);
};

Collection.prototype.onstart = function (evt) {
    var self = this;
    var opts = self.options;
    evt = u.prepareEvent(evt);

    // Update the box position
    self.updateBox();

    var process = function (touch) {
        // If we can create new nipples
        // meaning we don't have more active nipples than we should.
        if (self.actives.length < opts.maxNumberOfNipples) {
            self.processOnStart(touch);
        }
    };

    u.map(evt, process);

    // We ask upstream to bind the document
    // on 'move' and 'end'
    self.manager.bindDocument();
    return false;
};

Collection.prototype.processOnStart = function (evt) {
    var self = this;
    var opts = self.options;
    var indexInIdles;
    var identifier = self.manager.getIdentifier(evt);
    var pressure = evt.force || evt.pressure || evt.webkitForce || 0;
    var position = {
        x: evt.pageX,
        y: evt.pageY
    };

    var nipple = self.getOrCreate(identifier, position);

    // Update its touch identifier
    if (nipple.identifier !== identifier) {
        self.manager.removeIdentifier(nipple.identifier);
    }
    nipple.identifier = identifier;

    var process = function (nip) {
        // Trigger the start.
        nip.trigger('start', nip);
        self.trigger('start ' + nip.id + ':start', nip);

        nip.show();
        if (pressure > 0) {
            self.pressureFn(evt, nip, nip.identifier);
        }
        // Trigger the first move event.
        self.processOnMove(evt);
    };

    // Transfer it from idles to actives.
    if ((indexInIdles = self.idles.indexOf(nipple)) >= 0) {
        self.idles.splice(indexInIdles, 1);
    }

    // Store the nipple in the actives array
    self.actives.push(nipple);
    self.ids.push(nipple.identifier);

    if (opts.mode !== 'semi') {
        process(nipple);
    } else {
        // In semi we check the distance of the touch
        // to decide if we have to reset the nipple
        var distance = u.distance(position, nipple.position);
        if (distance <= opts.catchDistance) {
            process(nipple);
        } else {
            nipple.destroy();
            self.processOnStart(evt);
            return;
        }
    }

    return nipple;
};

Collection.prototype.getOrCreate = function (identifier, position) {
    var self = this;
    var opts = self.options;
    var nipple;

    // If we're in static or semi, we might already have an active.
    if (/(semi|static)/.test(opts.mode)) {
        // Get the active one.
        // TODO: Multi-touche for semi and static will start here.
        // Return the nearest one.
        nipple = self.idles[0];
        if (nipple) {
            self.idles.splice(0, 1);
            return nipple;
        }

        if (opts.mode === 'semi') {
            // If we're in semi mode, we need to create one.
            return self.createNipple(position, identifier);
        }

        console.warn('Coudln\'t find the needed nipple.');
        return false;
    }
    // In dynamic, we create a new one.
    nipple = self.createNipple(position, identifier);
    return nipple;
};

Collection.prototype.processOnMove = function (evt) {
    var self = this;
    var opts = self.options;
    var identifier = self.manager.getIdentifier(evt);
    var nipple = self.nipples.get(identifier);

    if (!nipple) {
        // This is here just for safety.
        // It shouldn't happen.
        console.error('Found zombie joystick with ID ' + identifier);
        self.manager.removeIdentifier(identifier);
        return;
    }

    nipple.identifier = identifier;

    var size = nipple.options.size / 2;
    var pos = {
        x: evt.pageX,
        y: evt.pageY
    };

    var dist = u.distance(pos, nipple.position);
    var angle = u.angle(pos, nipple.position);
    var rAngle = u.radians(angle);
    var force = dist / size;

    // If distance is bigger than nipple's size
    // we clamp the position.
    if (dist > size) {
        dist = size;
        pos = u.findCoord(nipple.position, dist, angle);
    }

    nipple.frontPosition = {
        x: pos.x - nipple.position.x,
        y: pos.y - nipple.position.y
    };

    if (!opts.dataOnly) {
        u.applyPosition(nipple.ui.front, nipple.frontPosition);
    }

    // Prepare event's datas.
    var toSend = {
        identifier: nipple.identifier,
        position: pos,
        force: force,
        pressure: evt.force || evt.pressure || evt.webkitForce || 0,
        distance: dist,
        angle: {
            radian: rAngle,
            degree: angle
        },
        instance: nipple
    };

    // Compute the direction's datas.
    toSend = nipple.computeDirection(toSend);

    // Offset angles to follow units circle.
    toSend.angle = {
        radian: u.radians(180 - angle),
        degree: 180 - angle
    };

    // Send everything to everyone.
    nipple.trigger('move', toSend);
    self.trigger('move ' + nipple.id + ':move', toSend);
};

Collection.prototype.processOnEnd = function (evt) {
    var self = this;
    var opts = self.options;
    var identifier = self.manager.getIdentifier(evt);
    var nipple = self.nipples.get(identifier);
    var removedIdentifier = self.manager.removeIdentifier(nipple.identifier);

    if (!nipple) {
        return;
    }

    if (!opts.dataOnly) {
        nipple.hide(function () {
            if (opts.mode === 'dynamic') {
                nipple.trigger('removed', nipple);
                self.trigger('removed ' + nipple.id + ':removed', nipple);
                self.manager
                    .trigger('removed ' + nipple.id + ':removed', nipple);
                nipple.destroy();
            }
        });
    }

    // Clear the pressure interval reader
    clearInterval(self.pressureIntervals[nipple.identifier]);

    // Reset the direciton of the nipple, to be able to trigger a new direction
    // on start.
    nipple.resetDirection();

    nipple.trigger('end', nipple);
    self.trigger('end ' + nipple.id + ':end', nipple);

    // Remove identifier from our bank.
    if (self.ids.indexOf(nipple.identifier) >= 0) {
        self.ids.splice(self.ids.indexOf(nipple.identifier), 1);
    }

    // Clean our actives array.
    if (self.actives.indexOf(nipple) >= 0) {
        self.actives.splice(self.actives.indexOf(nipple), 1);
    }

    if (/(semi|static)/.test(opts.mode)) {
        // Transfer nipple from actives to idles
        // if we're in semi or static mode.
        self.idles.push(nipple);
    } else if (self.nipples.indexOf(nipple) >= 0) {
        // Only if we're not in semi or static mode
        // we can remove the instance.
        self.nipples.splice(self.nipples.indexOf(nipple), 1);
    }

    // We unbind move and end.
    self.manager.unbindDocument();

    // We add back the identifier of the idle nipple;
    if (/(semi|static)/.test(opts.mode)) {
        self.manager.ids[removedIdentifier.id] = removedIdentifier.identifier;
    }
};

// Remove destroyed nipple from the lists
Collection.prototype.onDestroyed = function(evt, nipple) {
    var self = this;
    if (self.nipples.indexOf(nipple) >= 0) {
        self.nipples.splice(self.nipples.indexOf(nipple), 1);
    }
    if (self.actives.indexOf(nipple) >= 0) {
        self.actives.splice(self.actives.indexOf(nipple), 1);
    }
    if (self.idles.indexOf(nipple) >= 0) {
        self.idles.splice(self.idles.indexOf(nipple), 1);
    }
    if (self.ids.indexOf(nipple.identifier) >= 0) {
        self.ids.splice(self.ids.indexOf(nipple.identifier), 1);
    }

    // Remove the identifier from our bank
    self.manager.removeIdentifier(nipple.identifier);

    // We unbind move and end.
    self.manager.unbindDocument();
};

// Cleanly destroy the manager
Collection.prototype.destroy = function () {
    var self = this;
    self.unbindEvt(self.options.zone, 'start');

    // Destroy nipples.
    self.nipples.forEach(function(nipple) {
        nipple.destroy();
    });

    // Clean 3DTouch intervals.
    for (var i in self.pressureIntervals) {
        if (self.pressureIntervals.hasOwnProperty(i)) {
            clearInterval(self.pressureIntervals[i]);
        }
    }

    // Notify the manager passing the instance
    self.trigger('destroyed', self.nipples);
    // We unbind move and end.
    self.manager.unbindDocument();
    // Unbind everything.
    self.off();
};

/* global u, Super, Collection */

///////////////////////
///     MANAGER     ///
///////////////////////

function Manager (options) {
    var self = this;
    self.ids = {};
    self.index = 0;
    self.collections = [];

    self.config(options);
    self.prepareCollections();

    // Listen for resize, to reposition every joysticks
    var resizeTimer;
    u.bindEvt(window, 'resize', function (evt) {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(function () {
            var pos;
            var scroll = u.getScroll();
            self.collections.forEach(function (collection) {
                collection.forEach(function (nipple) {
                    pos = nipple.el.getBoundingClientRect();
                    nipple.position = {
                        x: scroll.x + pos.left,
                        y: scroll.y + pos.top
                    };
                });
            });
        }, 100);
    });

    return self.collections;
};

Manager.prototype = new Super();
Manager.constructor = Manager;

Manager.prototype.prepareCollections = function () {
    var self = this;
    // Public API Preparation.
    self.collections.create = self.create.bind(self);
    // Listen to anything
    self.collections.on = self.on.bind(self);
    // Unbind general events
    self.collections.off = self.off.bind(self);
    // Destroy everything
    self.collections.destroy = self.destroy.bind(self);
    // Get any nipple
    self.collections.get = function (id) {
        var nipple;
        self.collections.every(function (collection) {
            if (nipple = collection.get(id)) {
                return false;
            }
            return true;
        });
        return nipple;
    };
};

Manager.prototype.create = function (options) {
    return this.createCollection(options);
};

// Collection Factory
Manager.prototype.createCollection = function (options) {
    var self = this;
    var collection = new Collection(self, options);

    self.bindCollection(collection);
    self.collections.push(collection);

    return collection;
};

Manager.prototype.bindCollection = function (collection) {
    var self = this;
    var type;
    // Bubble up identified events.
    var handler = function (evt, data) {
        // Identify the event type with the nipple's identifier.
        type = evt.type + ' ' + data.id + ':' + evt.type;
        self.trigger(type, data);
    };

    // When it gets destroyed we clean.
    collection.on('destroyed', self.onDestroyed.bind(self));

    // Other events that will get bubbled up.
    collection.on('shown hidden rested dir plain', handler);
    collection.on('dir:up dir:right dir:down dir:left', handler);
    collection.on('plain:up plain:right plain:down plain:left', handler);
};

Manager.prototype.bindDocument = function () {
    var self = this;
    // Bind only if not already binded
    if (!self.binded) {
        self.bindEvt(document, 'move')
            .bindEvt(document, 'end');
        self.binded = true;
    }
};

Manager.prototype.unbindDocument = function (force) {
    var self = this;
    // If there are no touch left
    // unbind the document.
    if (!Object.keys(self.ids).length || force === true) {
        self.unbindEvt(document, 'move')
            .unbindEvt(document, 'end');
        self.binded = false;
    }
};

Manager.prototype.getIdentifier = function (evt) {
    var id;
    // If no event, simple increment
    if (!evt) {
        id = this.index;
    } else {
        // Extract identifier from event object.
        // Unavailable in mouse events so replaced by latest increment.
        id = evt.identifier === undefined ? evt.pointerId : evt.identifier;
        if (id === undefined) {
            id = this.latest || 0;
        }
    }

    if (this.ids[id] === undefined) {
        this.ids[id] = this.index;
        this.index += 1;
    }

    // Keep the latest id used in case we're using an unidentified mouseEvent
    this.latest = id;
    return this.ids[id];
};

Manager.prototype.removeIdentifier = function (identifier) {
    var removed = {};
    for (var id in this.ids) {
        if (this.ids[id] === identifier) {
            removed.id = id;
            removed.identifier = this.ids[id];
            delete this.ids[id];
            break;
        }
    }
    return removed;
};

Manager.prototype.onmove = function (evt) {
    var self = this;
    self.onAny('move', evt);
    return false;
};

Manager.prototype.onend = function (evt) {
    var self = this;
    self.onAny('end', evt);
    return false;
};

Manager.prototype.onAny = function (which, evt) {
    var self = this;
    var id;
    var processFn = 'processOn' + which.charAt(0).toUpperCase() +
        which.slice(1);
    evt = u.prepareEvent(evt);
    var processColl = function (e, id, coll) {
        if (coll.ids.indexOf(id) >= 0) {
            coll[processFn](e);
            // Mark the event to avoid cleaning it later.
            e._found_ = true;
        }
    };
    var processEvt = function (e) {
        id = self.getIdentifier(e);
        u.map(self.collections, processColl.bind(null, e, id));
        // If the event isn't handled by any collection,
        // we need to clean its identifier.
        if (!e._found_) {
            self.removeIdentifier(id);
        }
    };

    u.map(evt, processEvt);

    return false;
};

// Cleanly destroy the manager
Manager.prototype.destroy = function () {
    var self = this;
    self.unbindDocument(true);
    self.ids = {};
    self.index = 0;
    self.collections.forEach(function(collection) {
        collection.destroy();
    });
    self.off();
};

// When a collection gets destroyed
// we clean behind.
Manager.prototype.onDestroyed = function (evt, coll) {
    var self = this;
    if (self.collections.indexOf(coll) < 0) {
        return false;
    }
    self.collections.splice(self.collections.indexOf(coll), 1);
};

var factory = new Manager();
return {
    create: function (options) {
        return factory.create(options);
    },
    factory: factory
};

});


/***/ }),

/***/ "./node_modules/raw-loader/index.js!./src/app/pages/steuerung/steuerung.page.html":
/*!*******************************************************************************!*\
  !*** ./node_modules/raw-loader!./src/app/pages/steuerung/steuerung.page.html ***!
  \*******************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\r\n<ion-header>\r\n  <ion-toolbar color=\"dark\">\r\n    <div class=\"ion-text-center\">\r\n      <div>\r\n        <!--<ion-buttons>-->\r\n          <!--<ion-button color=\"primary\" (click)=\"disconnectFromRacer()\"><ion-icon slot=\"start\" name=\"arrow-back\"></ion-icon></ion-button>-->\r\n          <ion-button padding style=\"width: auto; height: auto;\" id=\"buttontxt\" fill=\"outline\" color=\"primary\" (click)=\"Scan()\">\r\n            <!--<ion-avatar>\r\n              <img src=\"assets/iotracer/Icons/icon.png\" style=\"width: 100%; height: 100%\">\r\n            </ion-avatar>-->\r\n            {{ connectbutton }}\r\n          </ion-button>\r\n        <!--</ion-buttons>-->\r\n      </div>\r\n  </div>\r\n  </ion-toolbar>\r\n</ion-header>\r\n\r\n<ion-content color=\"dark\" scroll-y=\"false\" scroll-x=\"false\">\r\n  \r\n    <ion-img id=\"backgroundSkyline\" src=\"assets/iotracer/Background/skyline_color_steuerung.svg\"></ion-img>\r\n    <ion-img id=\"backgroundSkylineLandscape\" src=\"assets/iotracer/Background/skyline_color_Landscape.svg\"></ion-img>\r\n    <ion-img id=\"rotateTacho\" src=\"assets/iotracer/rotate_tacho_direction.svg\"></ion-img>\r\n    <div id=\"positionContArea\">\r\n      <ion-img id=\"backgroundRemote\" src=\"assets/iotracer/Background/remote_ground.svg\"></ion-img>\r\n      <div id=\"zone_joystick1\">\r\n        <ion-img src=\"assets/iotracer/button_outside.svg\"></ion-img>\r\n      </div>\r\n      <div id=\"zone_joystick2\">\r\n        <ion-img src=\"assets/iotracer/button_outside.svg\"></ion-img>\r\n      </div>\r\n    </div>\r\n\r\n</ion-content>\r\n<!--<ion-footer>\r\n  <ion-toolbar color=\"dark\">\r\n    <div margin style=\"width: 30%; float: right\">\r\n      <ion-img src=\"assets/iotracer/Logos/Logo T-Systems communication externe.png\"></ion-img>\r\n    </div>\r\n  </ion-toolbar>\r\n</ion-footer>-->\r\n"

/***/ }),

/***/ "./src/app/pages/steuerung/steuerung.module.ts":
/*!*****************************************************!*\
  !*** ./src/app/pages/steuerung/steuerung.module.ts ***!
  \*****************************************************/
/*! exports provided: SteuerungPageModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SteuerungPageModule", function() { return SteuerungPageModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm2015/common.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm2015/forms.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm2015/router.js");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @ionic/angular */ "./node_modules/@ionic/angular/dist/fesm5.js");
/* harmony import */ var _steuerung_page__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./steuerung.page */ "./src/app/pages/steuerung/steuerung.page.ts");







const routes = [
    {
        path: '',
        component: _steuerung_page__WEBPACK_IMPORTED_MODULE_6__["SteuerungPage"]
    }
];
let SteuerungPageModule = class SteuerungPageModule {
};
SteuerungPageModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
        imports: [
            _angular_common__WEBPACK_IMPORTED_MODULE_2__["CommonModule"],
            _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormsModule"],
            _ionic_angular__WEBPACK_IMPORTED_MODULE_5__["IonicModule"],
            _angular_router__WEBPACK_IMPORTED_MODULE_4__["RouterModule"].forChild(routes),
        ],
        declarations: [_steuerung_page__WEBPACK_IMPORTED_MODULE_6__["SteuerungPage"]]
    })
], SteuerungPageModule);



/***/ }),

/***/ "./src/app/pages/steuerung/steuerung.page.scss":
/*!*****************************************************!*\
  !*** ./src/app/pages/steuerung/steuerung.page.scss ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".welcome-card img {\n  max-height: 35vh;\n  overflow: hidden;\n}\n\n.zone {\n  margin: 0;\n  color: blue;\n  right: 0;\n  bottom: 0;\n  background: rgba(255, 0, 0, 0.1);\n}\n\n#buttontxt {\n  font-size: 17px;\n  font-weight: bold;\n  font-style: italic;\n}\n\n/* For portrait*/\n\n@media screen and (orientation: portrait) {\n  #backgroundSkyline {\n    position: absolute;\n    bottom: 6%;\n    height: 100%;\n  }\n\n  #backgroundSkylineLandscape {\n    display: none;\n  }\n\n  #rotateTacho {\n    width: 60%;\n    margin: auto;\n    margin-top: 10%;\n  }\n\n  #positionContArea {\n    position: absolute;\n    bottom: 10%;\n    width: 100%;\n  }\n\n  #backgroundRemote {\n    position: absolute;\n    margin-top: -40%;\n  }\n\n  #zone_joystick1 {\n    width: 35%;\n    float: left;\n    position: relative;\n    left: 0;\n    top: 0;\n    margin: auto;\n  }\n\n  #zone_joystick2 {\n    float: right;\n    width: 35%;\n    position: relative;\n    left: 0;\n    top: 0;\n    margin: auto;\n  }\n}\n\n/* For landscape */\n\n@media screen and (orientation: landscape) {\n  #backgroundSkyline {\n    position: absolute;\n    width: 100%;\n    height: 100%;\n    display: none;\n  }\n\n  #backgroundSkylineLandscape {\n    position: absolute;\n    width: 100%;\n  }\n\n  #backgroundRemote {\n    position: absolute;\n    margin-top: -23%;\n  }\n\n  #rotateTacho {\n    width: 25%;\n    margin: auto;\n    margin-top: 0;\n  }\n\n  #positionContArea {\n    position: absolute;\n    bottom: 10%;\n    width: 100%;\n  }\n\n  #zone_joystick1 {\n    width: 17%;\n    float: left;\n    position: relative;\n    left: 5%;\n    top: 0;\n    margin: auto;\n  }\n\n  #zone_joystick2 {\n    float: right;\n    width: 17%;\n    position: relative;\n    right: 5%;\n    top: 0;\n    margin: auto;\n  }\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvcGFnZXMvc3RldWVydW5nL0M6XFxVc2Vyc1xcY3BpdHRlcnNcXERFVlxcR0lUXFxpb3QtcmFjZXItYml0YnVja2V0XFxvbnNpdGVyYWNlclxcT25TaXRlUmFjZXJfdjJcXEFwcFxcb25zaXRlLXJhY2VyLWlvbmljL3NyY1xcYXBwXFxwYWdlc1xcc3RldWVydW5nXFxzdGV1ZXJ1bmcucGFnZS5zY3NzIiwic3JjL2FwcC9wYWdlcy9zdGV1ZXJ1bmcvc3RldWVydW5nLnBhZ2Uuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtFQUNJLGdCQUFBO0VBQ0EsZ0JBQUE7QUNDSjs7QURFRTtFQUNFLFNBQUE7RUFDQSxXQUFBO0VBQ0EsUUFBQTtFQUNBLFNBQUE7RUFDQSxnQ0FBQTtBQ0NKOztBREVFO0VBQ0UsZUFBQTtFQUNBLGlCQUFBO0VBQ0Esa0JBQUE7QUNDSjs7QURJRSxnQkFBQTs7QUFFRjtFQUNFO0lBQ0Usa0JBQUE7SUFDQSxVQUFBO0lBQ0EsWUFBQTtFQ0ZGOztFRElBO0lBQ0UsYUFBQTtFQ0RGOztFREdBO0lBQ0UsVUFBQTtJQUNBLFlBQUE7SUFDQSxlQUFBO0VDQUY7O0VERUE7SUFDRSxrQkFBQTtJQUNBLFdBQUE7SUFDQSxXQUFBO0VDQ0Y7O0VEQ0E7SUFDRSxrQkFBQTtJQUNBLGdCQUFBO0VDRUY7O0VEQUE7SUFDRSxVQUFBO0lBQ0EsV0FBQTtJQUNBLGtCQUFBO0lBQ0EsT0FBQTtJQUNBLE1BQUE7SUFDQSxZQUFBO0VDR0Y7O0VEREE7SUFDRSxZQUFBO0lBQ0EsVUFBQTtJQUNBLGtCQUFBO0lBQ0EsT0FBQTtJQUNBLE1BQUE7SUFDQSxZQUFBO0VDSUY7QUFDRjs7QUREQSxrQkFBQTs7QUFFQTtFQUNFO0lBQ0Usa0JBQUE7SUFDQSxXQUFBO0lBQ0EsWUFBQTtJQUNBLGFBQUE7RUNFRjs7RURBQTtJQUNFLGtCQUFBO0lBQ0EsV0FBQTtFQ0dGOztFRERBO0lBQ0Usa0JBQUE7SUFDQSxnQkFBQTtFQ0lGOztFREZBO0lBQ0UsVUFBQTtJQUNBLFlBQUE7SUFDQSxhQUFBO0VDS0Y7O0VESEE7SUFDRSxrQkFBQTtJQUNBLFdBQUE7SUFDQSxXQUFBO0VDTUY7O0VESkE7SUFDRSxVQUFBO0lBQ0EsV0FBQTtJQUNBLGtCQUFBO0lBQ0EsUUFBQTtJQUNBLE1BQUE7SUFDQSxZQUFBO0VDT0Y7O0VETEE7SUFDRSxZQUFBO0lBQ0EsVUFBQTtJQUNBLGtCQUFBO0lBQ0EsU0FBQTtJQUNBLE1BQUE7SUFDQSxZQUFBO0VDUUY7QUFDRiIsImZpbGUiOiJzcmMvYXBwL3BhZ2VzL3N0ZXVlcnVuZy9zdGV1ZXJ1bmcucGFnZS5zY3NzIiwic291cmNlc0NvbnRlbnQiOlsiLndlbGNvbWUtY2FyZCBpbWcge1xyXG4gICAgbWF4LWhlaWdodDogMzV2aDtcclxuICAgIG92ZXJmbG93OiBoaWRkZW47XHJcbiAgfVxyXG4gIFxyXG4gIC56b25lIHtcclxuICAgIG1hcmdpbjogMDtcclxuICAgIGNvbG9yOiBibHVlO1xyXG4gICAgcmlnaHQ6IDA7XHJcbiAgICBib3R0b206IDA7XHJcbiAgICBiYWNrZ3JvdW5kOiByZ2JhKDI1NSwgMCwgMCwgMC4xKTtcclxuICB9XHJcblxyXG4gICNidXR0b250eHR7XHJcbiAgICBmb250LXNpemU6IDE3cHg7XHJcbiAgICBmb250LXdlaWdodDogYm9sZDtcclxuICAgIGZvbnQtc3R5bGU6IGl0YWxpYztcclxuICB9XHJcblxyXG5cclxuXHJcbiAgLyogRm9yIHBvcnRyYWl0Ki9cclxuXHJcbkBtZWRpYSBzY3JlZW4gYW5kIChvcmllbnRhdGlvbjogcG9ydHJhaXQpIHtcclxuICAjYmFja2dyb3VuZFNreWxpbmV7XHJcbiAgICBwb3NpdGlvbjogYWJzb2x1dGU7IFxyXG4gICAgYm90dG9tOiA2JTtcclxuICAgIGhlaWdodDogMTAwJTtcclxuICB9XHJcbiAgI2JhY2tncm91bmRTa3lsaW5lTGFuZHNjYXBle1xyXG4gICAgZGlzcGxheTogbm9uZTtcclxuICB9XHJcbiAgI3JvdGF0ZVRhY2hve1xyXG4gICAgd2lkdGg6IDYwJTsgXHJcbiAgICBtYXJnaW46IGF1dG87IFxyXG4gICAgbWFyZ2luLXRvcDogMTAlO1xyXG4gIH1cclxuICAjcG9zaXRpb25Db250QXJlYXtcclxuICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTsgXHJcbiAgICBib3R0b206IDEwJTsgXHJcbiAgICB3aWR0aDogMTAwJTtcclxuICB9XHJcbiAgI2JhY2tncm91bmRSZW1vdGV7XHJcbiAgICBwb3NpdGlvbjogYWJzb2x1dGU7IFxyXG4gICAgbWFyZ2luLXRvcDogLTQwJTtcclxuICB9XHJcbiAgI3pvbmVfam95c3RpY2sxe1xyXG4gICAgd2lkdGg6IDM1JTsgXHJcbiAgICBmbG9hdDpsZWZ0OyBcclxuICAgIHBvc2l0aW9uOiByZWxhdGl2ZTsgXHJcbiAgICBsZWZ0OiAwOyBcclxuICAgIHRvcDogMDsgXHJcbiAgICBtYXJnaW46IGF1dG87XHJcbiAgfVxyXG4gICN6b25lX2pveXN0aWNrMntcclxuICAgIGZsb2F0OnJpZ2h0OyBcclxuICAgIHdpZHRoOiAzNSU7IFxyXG4gICAgcG9zaXRpb246IHJlbGF0aXZlOyBcclxuICAgIGxlZnQ6IDA7IFxyXG4gICAgdG9wOiAwOyBcclxuICAgIG1hcmdpbjogYXV0bztcclxuICB9XHJcbn1cclxuXHJcbi8qIEZvciBsYW5kc2NhcGUgKi9cclxuXHJcbkBtZWRpYSBzY3JlZW4gYW5kIChvcmllbnRhdGlvbjogbGFuZHNjYXBlKSB7XHJcbiAgI2JhY2tncm91bmRTa3lsaW5le1xyXG4gICAgcG9zaXRpb246IGFic29sdXRlO1xyXG4gICAgd2lkdGg6IDEwMCU7XHJcbiAgICBoZWlnaHQ6IDEwMCU7XHJcbiAgICBkaXNwbGF5OiBub25lO1xyXG4gIH1cclxuICAjYmFja2dyb3VuZFNreWxpbmVMYW5kc2NhcGV7XHJcbiAgICBwb3NpdGlvbjogYWJzb2x1dGU7XHJcbiAgICB3aWR0aDogMTAwJTtcclxuICB9XHJcbiAgI2JhY2tncm91bmRSZW1vdGV7XHJcbiAgICBwb3NpdGlvbjogYWJzb2x1dGU7IFxyXG4gICAgbWFyZ2luLXRvcDogLTIzJTtcclxuICB9XHJcbiAgI3JvdGF0ZVRhY2hve1xyXG4gICAgd2lkdGg6IDI1JTtcclxuICAgIG1hcmdpbjogYXV0bzsgXHJcbiAgICBtYXJnaW4tdG9wOiAwO1xyXG4gIH1cclxuICAjcG9zaXRpb25Db250QXJlYXtcclxuICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTsgXHJcbiAgICBib3R0b206IDEwJTsgXHJcbiAgICB3aWR0aDogMTAwJTtcclxuICB9XHJcbiAgI3pvbmVfam95c3RpY2sxe1xyXG4gICAgd2lkdGg6IDE3JTsgXHJcbiAgICBmbG9hdDpsZWZ0OyBcclxuICAgIHBvc2l0aW9uOiByZWxhdGl2ZTsgXHJcbiAgICBsZWZ0OiA1JTsgXHJcbiAgICB0b3A6IDA7IFxyXG4gICAgbWFyZ2luOiBhdXRvO1xyXG4gIH1cclxuICAjem9uZV9qb3lzdGljazJ7XHJcbiAgICBmbG9hdDpyaWdodDsgXHJcbiAgICB3aWR0aDogMTclOyBcclxuICAgIHBvc2l0aW9uOiByZWxhdGl2ZTsgXHJcbiAgICByaWdodDogNSU7IFxyXG4gICAgdG9wOiAwOyBcclxuICAgIG1hcmdpbjogYXV0bztcclxuICB9XHJcblxyXG59IiwiLndlbGNvbWUtY2FyZCBpbWcge1xuICBtYXgtaGVpZ2h0OiAzNXZoO1xuICBvdmVyZmxvdzogaGlkZGVuO1xufVxuXG4uem9uZSB7XG4gIG1hcmdpbjogMDtcbiAgY29sb3I6IGJsdWU7XG4gIHJpZ2h0OiAwO1xuICBib3R0b206IDA7XG4gIGJhY2tncm91bmQ6IHJnYmEoMjU1LCAwLCAwLCAwLjEpO1xufVxuXG4jYnV0dG9udHh0IHtcbiAgZm9udC1zaXplOiAxN3B4O1xuICBmb250LXdlaWdodDogYm9sZDtcbiAgZm9udC1zdHlsZTogaXRhbGljO1xufVxuXG4vKiBGb3IgcG9ydHJhaXQqL1xuQG1lZGlhIHNjcmVlbiBhbmQgKG9yaWVudGF0aW9uOiBwb3J0cmFpdCkge1xuICAjYmFja2dyb3VuZFNreWxpbmUge1xuICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgICBib3R0b206IDYlO1xuICAgIGhlaWdodDogMTAwJTtcbiAgfVxuXG4gICNiYWNrZ3JvdW5kU2t5bGluZUxhbmRzY2FwZSB7XG4gICAgZGlzcGxheTogbm9uZTtcbiAgfVxuXG4gICNyb3RhdGVUYWNobyB7XG4gICAgd2lkdGg6IDYwJTtcbiAgICBtYXJnaW46IGF1dG87XG4gICAgbWFyZ2luLXRvcDogMTAlO1xuICB9XG5cbiAgI3Bvc2l0aW9uQ29udEFyZWEge1xuICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgICBib3R0b206IDEwJTtcbiAgICB3aWR0aDogMTAwJTtcbiAgfVxuXG4gICNiYWNrZ3JvdW5kUmVtb3RlIHtcbiAgICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gICAgbWFyZ2luLXRvcDogLTQwJTtcbiAgfVxuXG4gICN6b25lX2pveXN0aWNrMSB7XG4gICAgd2lkdGg6IDM1JTtcbiAgICBmbG9hdDogbGVmdDtcbiAgICBwb3NpdGlvbjogcmVsYXRpdmU7XG4gICAgbGVmdDogMDtcbiAgICB0b3A6IDA7XG4gICAgbWFyZ2luOiBhdXRvO1xuICB9XG5cbiAgI3pvbmVfam95c3RpY2syIHtcbiAgICBmbG9hdDogcmlnaHQ7XG4gICAgd2lkdGg6IDM1JTtcbiAgICBwb3NpdGlvbjogcmVsYXRpdmU7XG4gICAgbGVmdDogMDtcbiAgICB0b3A6IDA7XG4gICAgbWFyZ2luOiBhdXRvO1xuICB9XG59XG4vKiBGb3IgbGFuZHNjYXBlICovXG5AbWVkaWEgc2NyZWVuIGFuZCAob3JpZW50YXRpb246IGxhbmRzY2FwZSkge1xuICAjYmFja2dyb3VuZFNreWxpbmUge1xuICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgICB3aWR0aDogMTAwJTtcbiAgICBoZWlnaHQ6IDEwMCU7XG4gICAgZGlzcGxheTogbm9uZTtcbiAgfVxuXG4gICNiYWNrZ3JvdW5kU2t5bGluZUxhbmRzY2FwZSB7XG4gICAgcG9zaXRpb246IGFic29sdXRlO1xuICAgIHdpZHRoOiAxMDAlO1xuICB9XG5cbiAgI2JhY2tncm91bmRSZW1vdGUge1xuICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgICBtYXJnaW4tdG9wOiAtMjMlO1xuICB9XG5cbiAgI3JvdGF0ZVRhY2hvIHtcbiAgICB3aWR0aDogMjUlO1xuICAgIG1hcmdpbjogYXV0bztcbiAgICBtYXJnaW4tdG9wOiAwO1xuICB9XG5cbiAgI3Bvc2l0aW9uQ29udEFyZWEge1xuICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgICBib3R0b206IDEwJTtcbiAgICB3aWR0aDogMTAwJTtcbiAgfVxuXG4gICN6b25lX2pveXN0aWNrMSB7XG4gICAgd2lkdGg6IDE3JTtcbiAgICBmbG9hdDogbGVmdDtcbiAgICBwb3NpdGlvbjogcmVsYXRpdmU7XG4gICAgbGVmdDogNSU7XG4gICAgdG9wOiAwO1xuICAgIG1hcmdpbjogYXV0bztcbiAgfVxuXG4gICN6b25lX2pveXN0aWNrMiB7XG4gICAgZmxvYXQ6IHJpZ2h0O1xuICAgIHdpZHRoOiAxNyU7XG4gICAgcG9zaXRpb246IHJlbGF0aXZlO1xuICAgIHJpZ2h0OiA1JTtcbiAgICB0b3A6IDA7XG4gICAgbWFyZ2luOiBhdXRvO1xuICB9XG59Il19 */"

/***/ }),

/***/ "./src/app/pages/steuerung/steuerung.page.ts":
/*!***************************************************!*\
  !*** ./src/app/pages/steuerung/steuerung.page.ts ***!
  \***************************************************/
/*! exports provided: SteuerungPage */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SteuerungPage", function() { return SteuerungPage; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _ionic_native_ble_ngx__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @ionic-native/ble/ngx */ "./node_modules/@ionic-native/ble/ngx/index.js");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @ionic/angular */ "./node_modules/@ionic/angular/dist/fesm5.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm2015/router.js");
/* harmony import */ var nipplejs__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! nipplejs */ "./node_modules/nipplejs/dist/nipplejs.js");
/* harmony import */ var nipplejs__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(nipplejs__WEBPACK_IMPORTED_MODULE_5__);







let SteuerungPage = class SteuerungPage {
    constructor(ble, alertCtrl, ngZone, toastCtrl, router, loadingController) {
        this.ble = ble;
        this.alertCtrl = alertCtrl;
        this.ngZone = ngZone;
        this.toastCtrl = toastCtrl;
        this.router = router;
        this.loadingController = loadingController;
        this.size = 110;
        this.connectbutton = "Connect to Car";
        this.devices = [];
        this.peripheral = {};
        this.services = ["ae975c80-05f0-11ea-8d71-362b9e155667"];
        this.speed = 128; //motor off
        this.steer = 90; // 
        this.counterSpeed = 0;
        this.counterSteer = 0;
        this.connected = false;
        this.checkBluetooth();
    }
    presentLoadingWithOptions() {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function* () {
            const loading = yield this.loadingController.create({
                spinner: null,
                duration: 3000,
                message: '<img src="assets/iotracer/Loading/pink.svg" width=40px>' + "  Connecting..."
            });
            yield loading.present();
            const { role, data } = yield loading.onDidDismiss();
            console.log('Failed: ', role);
        });
    }
    /*disconnectFromRacer(){
      if(this.connected === true){
        this.connectbutton = "Connect to Car";
        this.ble.disconnect(this.peripheral.id).then(
          device => this.onDeviceDisconnected(device),
        );
        this.router.navigate(['/']);
      }else{
        this.router.navigate(['/']);
      }
    }*/
    //scan for BLE Devices with specific Service-uuid
    Scan() {
        this.devices = ['ae975c80-05f0-11ea-8d71-362b9e155667'];
        this.checkBluetooth();
        if (this.connected === false) {
            this.ble.isEnabled().then(success => {
                this.presentLoadingWithOptions();
                //this.connectbutton = "Disconnect Car";
            });
            //connect to device with this serviceUID
            this.ble.scan(this.devices, 15).subscribe(
            //connect to your car if  service uuid is found during scanning
            device => this.onDeviceDiscovered(device));
        }
        else {
            //Discconect Device
            this.connectbutton = "Connect to Car";
            this.ble.disconnect(this.peripheral.id).then(device => this.onDeviceDisconnected(device), device => this.scanError(""));
            this.showBleDisconnected("You are Disconnected from the T-Racer");
        }
    }
    checkBluetooth() {
        this.ble.isEnabled().then(success => {
            this.showToast("Bluetooth is enabled");
        }, error => {
            this.showError("Bluetooth is not enabled");
        });
    }
    //creats a popup with a bluetooth disconnect message
    showBleDisconnected(msg) {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function* () {
            const alert = yield this.alertCtrl.create({
                header: "Bluetooth",
                message: '<img src="assets/iotracer/Logos/disconnect.svg">',
                subHeader: msg,
                buttons: ["OK"]
            });
            yield alert.present();
        });
    }
    showError(error) {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function* () {
            const alert = yield this.alertCtrl.create({
                header: "Error",
                message: '<img src="assets/iotracer/Icons/bluetooth.svg">',
                subHeader: error,
                buttons: ["OK"]
            });
            yield alert.present();
        });
    }
    showToast(msj) {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function* () {
            const toast = yield this.toastCtrl.create({
                message: msj,
                duration: 1000
            });
            yield toast.present();
        });
    }
    scanError(error) {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function* () {
            let toast = this.toastCtrl.create({
                message: 'car not found ',
                duration: 3000,
                position: 'middle'
            });
            (yield toast).present();
        });
    }
    onDeviceDiscovered(device) {
        console.debug('Discovered' + JSON.stringify(device, null, 2));
        this.connect2Device(device);
        this.connectbutton = "Disconnect Car";
    }
    connect2Device(device) {
        this.deviceID = device.id;
        this.ble.connect(device.id).subscribe(peripheral => this.onConnected(peripheral), peripheral => this.onDeviceDisconnected(peripheral));
    }
    onConnected(peripheral) {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function* () {
            let toast = this.toastCtrl.create({
                message: 'Connected to ' + peripheral.name,
                duration: 3000,
                position: 'bottom'
            });
            (yield toast).present();
            this.peripheral = peripheral;
            this.connected = true;
            this.deviceID = peripheral.id;
            // Static characteristicID for both plattforms
            this.characteristicID = "b81f189c-05f0-11ea-8d71-362b9e155667";
            // For iOS
            //this.characteristicID =  peripheral.characteristics[0].characteristic; // "b81f189c-05f0-11ea-8d71-362b9e155667";
            // For Android
            //this.characteristicID =  peripheral.characteristics[4].characteristic;
            console.log("Printing all characteristics in peripheral.characteristics[]");
            for (let i of peripheral.characteristics) {
                console.log("Characteristic: " + JSON.stringify(i));
            }
            this.jsSpeed.destroy();
            this.jsSteer.destroy();
            var joystickSpeed = Object(nipplejs__WEBPACK_IMPORTED_MODULE_5__["create"])({
                mode: 'static',
                color: 'black',
                fadeTime: 255,
                size: this.size,
                lockY: false,
                zone: document.getElementById('zone_joystick1'),
                position: {
                    left: '50%',
                    top: '50%'
                }
            });
            var joystickSteer = Object(nipplejs__WEBPACK_IMPORTED_MODULE_5__["create"])({
                mode: 'static',
                color: 'black',
                fadeTime: 255,
                size: this.size,
                lockX: false,
                zone: document.getElementById('zone_joystick2'),
                position: {
                    left: '50%',
                    top: '50%'
                }
            });
            this.jsSpeed = joystickSpeed;
            this.jsSteer = joystickSteer;
            this.jsSpeed.on('end', (event, data) => this.stop_motor(event, data));
            this.jsSpeed.on('move', (event, data) => this.move_speed(event, data));
            this.jsSteer.on('end', (event, data) => this.steer_straighton(event, data));
            this.jsSteer.on('move', (event, data) => this.move_steer(event, data));
        });
    }
    onDeviceDisconnected(peripheral) {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function* () {
            /*let toast = this.toastCtrl.create({
              message: 'Disconnected from ' + peripheral.name,
              duration: 3000,
              position: 'bottom'
            });
            (await toast).present();*/
            this.connected = false;
            this.jsSpeed.destroy();
            this.jsSteer.destroy();
            this.router.navigate(['pages/steuerung']);
        });
    }
    //write need if we have twi joysticks
    sendValue() {
        var value = this.speed + "," + this.steer;
        console.log("Sending: deviceID(" + this.deviceID + ") services(" + this.services[0] + ") characteristicID(" + this.characteristicID + ") buffer(" + value.toString() + ")");
        this.ble.writeWithoutResponse(this.deviceID, this.services[0], this.characteristicID, this.stringToBytes(value.toString()));
    }
    stringToBytes(string) {
        var array = new Uint8Array(string.length);
        for (var i = 0, l = string.length; i < l; i++) {
            array[i] = string.charCodeAt(i);
        }
        return array.buffer;
    }
    //init joysticks in view init
    ngAfterViewInit() {
        var joystickSpeed = Object(nipplejs__WEBPACK_IMPORTED_MODULE_5__["create"])({
            mode: 'static',
            color: 'black',
            fadeTime: 255,
            size: this.size,
            lockY: true,
            lockX: true,
            zone: document.getElementById('zone_joystick1'),
            position: {
                left: '50%',
                top: '50%'
            }
        });
        var joystickSteer = Object(nipplejs__WEBPACK_IMPORTED_MODULE_5__["create"])({
            mode: 'static',
            color: 'black',
            fadeTime: 255,
            size: this.size,
            lockX: true,
            lockY: true,
            zone: document.getElementById('zone_joystick2'),
            position: {
                left: '50%',
                top: '50%'
            }
        });
        this.jsSpeed = joystickSpeed;
        this.jsSteer = joystickSteer;
        this.jsSpeed = joystickSpeed;
        this.jsSteer = joystickSteer;
    }
    //stop car
    stop_motor(event, data) {
        var speed = 128;
        this.speed = +speed;
        this.sendValue();
        console.log("Stopping car with value " + speed);
    }
    //steering car: straight on
    steer_straighton(event, data) {
        var steer = 90;
        this.steer = +steer;
        this.sendValue();
        console.log("steering car: straight on " + steer);
    }
    move_speed(event, data) {
        var nip_size = this.size;
        var max_rangeY = 255;
        var min_rangeY = 0;
        if (((data.angle.degree < 90) && (data.angle.degree > 0)) || ((data.angle.degree < 360) && (data.angle.degree > 270))) {
            var X = Math.cos(data.angle.radian) * data.distance;
            var Y = Math.sin(data.angle.radian) * data.distance;
        }
        if (((data.angle.degree <= 180) && (data.angle.degree >= 90)) || ((data.angle.degree <= 270) && (data.angle.degree >= 180))) {
            var X = -Math.cos(Math.PI - data.angle.radian) * data.distance;
            var Y = Math.sin(Math.PI - data.angle.radian) * data.distance;
        }
        var speed = ((Y + nip_size / 2) * (max_rangeY - min_rangeY) / nip_size + min_rangeY).toFixed(0);
        this.speed = +speed;
        //this._speed = speed.toString();
        //reduce traffic
        if (this.counterSpeed === 10) {
            console.log("Sending speed to car " + speed);
            this.sendValue();
            this.counterSpeed = 0;
        }
        this.counterSpeed++;
    }
    move_steer(event, data) {
        var nip_size = this.size;
        var max_rangeX = 0;
        var min_rangeX = 180;
        if (((data.angle.degree < 90) && (data.angle.degree >= 0)) || ((data.angle.degree < 360) && (data.angle.degree > 270))) {
            var X = Math.cos(data.angle.radian) * data.distance;
        }
        if (((data.angle.degree <= 180) && (data.angle.degree >= 90)) || ((data.angle.degree <= 270) && (data.angle.degree >= 180))) {
            var X = -Math.cos(Math.PI - data.angle.radian) * data.distance;
        }
        var steer = ((X + nip_size / 2) * (max_rangeX - min_rangeX) / nip_size + min_rangeX).toFixed(0);
        this.steer = +steer;
        //this._steer = steer.toString();
        //reduce traffic
        if (this.counterSteer === 5) {
            this.sendValue();
            this.counterSteer = 0;
        }
        this.counterSteer++;
    }
};
SteuerungPage.ctorParameters = () => [
    { type: _ionic_native_ble_ngx__WEBPACK_IMPORTED_MODULE_2__["BLE"] },
    { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_3__["AlertController"] },
    { type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["NgZone"] },
    { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_3__["ToastController"] },
    { type: _angular_router__WEBPACK_IMPORTED_MODULE_4__["Router"] },
    { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_3__["LoadingController"] }
];
SteuerungPage = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
        selector: 'app-steuerung',
        template: __webpack_require__(/*! raw-loader!./steuerung.page.html */ "./node_modules/raw-loader/index.js!./src/app/pages/steuerung/steuerung.page.html"),
        styles: [__webpack_require__(/*! ./steuerung.page.scss */ "./src/app/pages/steuerung/steuerung.page.scss")]
    }),
    tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_ionic_native_ble_ngx__WEBPACK_IMPORTED_MODULE_2__["BLE"], _ionic_angular__WEBPACK_IMPORTED_MODULE_3__["AlertController"], _angular_core__WEBPACK_IMPORTED_MODULE_1__["NgZone"], _ionic_angular__WEBPACK_IMPORTED_MODULE_3__["ToastController"], _angular_router__WEBPACK_IMPORTED_MODULE_4__["Router"], _ionic_angular__WEBPACK_IMPORTED_MODULE_3__["LoadingController"]])
], SteuerungPage);



/***/ })

}]);
//# sourceMappingURL=pages-steuerung-steuerung-module-es2015.js.map