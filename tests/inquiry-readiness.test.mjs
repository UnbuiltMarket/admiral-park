import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import vm from 'node:vm';
import test from 'node:test';

const program = await readFile(new URL('../src/framer/homepage-draft-3/inquiry-readiness.framer.js', import.meta.url), 'utf8');

function install() {
    const nodes = [];
    const tree = {
        root: { id: 'root' },
        getNodesOfTypes: () => nodes,
        insert: (type, id, properties) => nodes.push({ type, id, ...properties }),
        patch: (id, properties) => Object.assign(nodes.find(node => node.id === id), properties),
    };
    vm.runInNewContext(program, { api: { tree } });
    vm.runInNewContext(program, { api: { tree } });
    assert.equal(nodes.length, 1);
    assert.equal(nodes[0].placement, 'headEnd');
    assert.equal(nodes[0].loadMode, 'once');
    assert.equal(nodes[0].pageIds.join(), 'XLriEYHai');

    const listeners = new Map();
    const location = { search: '?apartment=a002' };
    const eventTarget = target => ({
        addEventListener(type, handler, capture) {
            assert.equal(capture, true);
            assert.equal(target, type === 'submit' ? 'window' : 'document');
            listeners.set(type, handler);
        },
    });
    const inquiryField = 'Kiválasztott lakás';
    class HTMLInputElement {
        disabled = false;
        value = 'A002';
    }
    class HTMLFormElement {
        callback = true;
        apartmentInput = null;
        querySelector(selector) {
            assert.equal(selector, '[data-admiral-form-favourites]');
            return this.callback ? {} : null;
        }
        elements = { namedItem: name => name === inquiryField ? this.apartmentInput : null };
    }
    vm.runInNewContext(nodes[0].code.replace(/^<script>\n|\n<\/script>$/g, ''), {
        document: eventTarget('document'), window: eventTarget('window'), HTMLFormElement, HTMLInputElement, location, URLSearchParams,
    });
    const form = new HTMLFormElement();
    const payload = oldValue => {
        const formData = new Map([['Vezetéknév', 'Teszt']]);
        if (oldValue) formData.set(inquiryField, oldValue);
        listeners.get('formdata')({ target: form, formData });
        return formData;
    };
    const submit = () => {
        const effects = [];
        listeners.get('submit')({ target: form, preventDefault: () => effects.push('prevent'), stopImmediatePropagation: () => effects.push('stop') });
        return effects;
    };
    return { form, inquiryField, location, payload, submit, HTMLInputElement };
}

test('binds the apartment before Framer hydrates and rejects an unbound or stale native submission', () => {
    const { form, inquiryField, location, payload, submit, HTMLInputElement } = install();
    assert.deepEqual([...payload()], [['Vezetéknév', 'Teszt'], [inquiryField, 'A002']]);
    assert.deepEqual(submit(), ['prevent', 'stop']);
    form.apartmentInput = new HTMLInputElement();
    assert.deepEqual(submit(), []);
    location.search = '?apartment=b301s';
    assert.equal(payload('A002').get(inquiryField), 'B301S');
    assert.deepEqual(submit(), ['prevent', 'stop']);
    form.apartmentInput.value = 'B301S';
    assert.deepEqual(submit(), []);
    form.apartmentInput.disabled = true;
    assert.deepEqual(submit(), ['prevent', 'stop']);
});

test('leaves generic and unrelated forms alone', () => {
    const { form, inquiryField, location, payload, submit } = install();
    for (const search of ['', '?apartment=not-a-unit', '?apartment=%3Ctag%3E']) {
        location.search = search;
        assert.equal(payload().has(inquiryField), false);
        assert.deepEqual(submit(), []);
    }
    location.search = '?apartment=A002';
    form.callback = false;
    assert.equal(payload().has(inquiryField), false);
    assert.deepEqual(submit(), []);
});
