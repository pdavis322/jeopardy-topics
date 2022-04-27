var assert = require('assert');
const evaluate = require('./evaluate.js');
describe('Answer Checking', function() {
    it('should remove articles from correct answer', function() {
        assert(evaluate("the Bible", "bible"));
    });
    it('should remove articles from user answer', function() {
        assert(evaluate("apple", "An apple"));
    });
    it('should evaluate valid acronyms as correct', function() {
        assert(evaluate("Franklin Delano Roosevelt", "fdr"));
    });
    it('should evaluate invalid acronyms as incorrect', function() {
        assert(!evaluate("National Basketball Association", "nbb"));
    });
    it('should evaluate slightly misspelled answers as correct', function() {
        assert(evaluate("Shakespeare", "shakespeer"));
    });
    it('should evaluate incorrect answers as incorrect', function() {
        assert(!evaluate("Shakespeare", "thoreau"));
    });
});

