import React from 'react';
import MarkdownIt from 'markdown-it';
import Markdown from './MarkdownPresenter';
import MarkdownPresenter from './MarkdownPresenter';
import {escapeHtml} from 'markdown-it/lib/common/utils';

class MarkdownContainer extends React.Component {
  constructor() {
    super();
    this.state = {inputText: ''};
  }

  componentDidMount() {
    const md = new MarkdownIt();
    md.renderer.rules.important = function (tokens, idx, options, env, slf) {
      const token = tokens[idx];

      return '<p style=color:blue;>' + escapeHtml(tokens[idx].content) + '</p>';
    };

    md.inline.ruler.push('important', function replace(state, silent) {
      let start,
        max,
        marker,
        token,
        matchStart,
        matchEnd,
        openerLength,
        closerLength,
        pos = state.pos,
        ch = state.src.charCodeAt(pos);

      if (ch !== 0x40 && state.src.charCodeAt(pos + 1) !== 0x62) {
        return false;
      }

      start = pos;
      pos = pos + 2;
      max = state.posMax;

      while (
        pos < max &&
        state.src.charCodeAt(pos) === 0x40 &&
        state.src.sharCodeAt(pos + 1) === 0x62
      ) {
        pos = pos + 2;
      }

      marker = state.src.slice(start, pos);
      openerLength = marker.length;

      if (
        state.backticksScanned &&
        (state.backticks[openerLength] || 0) <= start
      ) {
        if (!silent) state.pending += marker;
        return true;
      }

      matchStart = matchEnd = pos;

      // Nothing found in the cache, scan until the end of the line (or until marker is found)
      while ((matchStart = state.src.indexOf('@b', matchEnd)) !== -1) {
        matchEnd = matchStart + 2;

        // scan marker length
        while (
          matchEnd < max &&
          state.src.charCodeAt(matchEnd) === 0x40 /* ` */
        ) {
          matchEnd++;
        }

        closerLength = matchEnd - matchStart;

        if (closerLength === openerLength) {
          // Found matching closer length.
          if (!silent) {
            token = state.push('important', 'p', 0);
            token.markup = marker;
            token.content = state.src
              .slice(pos, matchStart)
              .replace(/\n/g, ' ')
              .replace(/^ (.+) $/, '$1');
          }
          state.pos = matchEnd;
          return true;
        }

        // Some different length found, put it in cache as upper limit of where closer can be found
        state.backticks[closerLength] = matchStart;
      }

      // Scanned through the end, didn't find anything
      state.backticksScanned = true;

      if (!silent) state.pending += marker;
      state.pos += openerLength;
      return true;
    });

    const text = md.render('@bhello@b');

    const text2 = md.render('```bold```');
    console.log(text2);

    this.setState({inputText: text});
  }

  render() {
    const {inputText} = this.state;
    return <Markdown output={inputText} />;
  }
}

export default MarkdownContainer;
