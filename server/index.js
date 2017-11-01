const express = require('express');
const phaseControl = require('phase-control');

const app = phaseControl(express(), {
  waitingTime: 1200000
});

app.phase('initialize app', './initializers');
app.phase('initialize routes', './routes');

