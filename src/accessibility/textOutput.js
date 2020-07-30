/**
 * @module Environment
 * @submodule Environment
 * @for p5
 * @requires core
 */
import p5 from '../core/main';

//the functions in this document support the creation of text output

let ingredients = {};
let background;

//creates html structure for text output
p5.prototype._createTextOutput = function(cIdT) {
  let inner =
    'Text Output<div id="' +
    cIdT +
    'Summary" aria-label="text output summary"><p id="' +
    cIdT +
    'SumP"></p><ul id="' +
    cIdT +
    'lst"></ul></div><table id="' +
    cIdT +
    'SD" summary="text output shape details"></table>';
  return inner;
};

//updates textOutput
p5.prototype._updateTextOutput = function(cnvId, ing, bkgr) {
  ingredients = ing;
  background = bkgr;
  let cIdT = cnvId + 'txtOut';
  let innerList = this._buildShapeList(cIdT);
  let innerSummary = this._buildTxtSummary(innerList.numShapes);
  let innerShapeDetails = this._buildShapeDetails(cIdT);
  if (document.getElementById(cIdT + 'SumP') !== null) {
    if (innerSummary !== document.getElementById(cIdT + 'SumP').innerHTML) {
      document.getElementById(cIdT + 'SumP').innerHTML = innerSummary;
    }
  }
  if (document.getElementById(cIdT + 'lst') !== null) {
    if (innerList !== document.getElementById(cIdT + 'lst').innerHTML) {
      document.getElementById(cIdT + 'lst').innerHTML = innerList.listShapes;
    }
  }
  if (document.getElementById(cIdT + 'SD') !== null) {
    if (innerShapeDetails !== document.getElementById(cIdT + 'SD').innerHTML) {
      document.getElementById(cIdT + 'SD').innerHTML = innerShapeDetails;
    }
  }
};

//Builds textOutput summary
p5.prototype._buildTxtSummary = function(numShapes) {
  let text =
    'Your output is a, ' +
    Math.round(this.width) +
    ' by ' +
    Math.round(this.height) +
    ' pixels, ' +
    background + //this was cnvConfig.background
    ' canvas. Containing the following ' +
    numShapes +
    ' shapes:';
  return text;
};

//Builds textOutput table with shape details
p5.prototype._buildShapeDetails = function(cId) {
  let shapeDetails = '';
  let el = 0;
  for (let x in ingredients) {
    for (let y in ingredients[x]) {
      el++;
      let row =
        '<tr id="' +
        cId +
        'shape' +
        el +
        '"><th>' +
        ingredients[x][y].color +
        ' ' +
        x +
        '</th>';
      if (x === 'line') {
        row =
          row +
          '<td>location = ' +
          ingredients[x][y].pos +
          '</td><td>length = ' +
          ingredients[x][y].length +
          ' pixels</td></tr>';
      } else {
        row = row + '<td>location = at ' + ingredients[x][y].pos + '</td>';
        if (x !== 'point') {
          row = row + '<td> area = ' + ingredients[x][y].area + '%</td>';
        }
        row = row + '</tr>';
      }
      shapeDetails = shapeDetails + row;
    }
  }
  return shapeDetails;
};

//Builds textOutput shape list
p5.prototype._buildShapeList = function(cId) {
  let elText = '';
  let el = 0;
  for (let x in ingredients) {
    for (let y in ingredients[x]) {
      el++;
      let _line =
        '<li><a href="#' +
        cId +
        'shape' +
        el +
        '">' +
        ingredients[x][y].color +
        ' ' +
        x +
        '</a>';
      if (x === 'line') {
        _line =
          _line +
          ', ' +
          ingredients[x][y].pos +
          ', ' +
          ingredients[x][y].length +
          ' pixels long.</li>';
      } else {
        _line = _line + ', at ' + ingredients[x][y].pos;
        if (x !== 'point') {
          _line =
            _line + ', covering ' + ingredients[x][y].area + '% of the canvas';
        }
        _line = _line + '.</li>';
      }
      elText = elText + _line;
    }
  }
  return { numShapes: el, listShapes: elText };
};

export default p5;
