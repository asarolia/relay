/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow strict-local
 * @format
 */

'use strict';

import type {Fragment, Request, Root, SplitOperation} from './GraphQLIR';
import type {GeneratedNode} from 'relay-runtime';

/**
 * Helpers to retieve the name of the document from which the input derives:
 * this is either the name of the input itself (if it is not a derived node)
 * or the metadata.derivedFrom property for derived nodes.
 */

// Version for generated nodes
function getReaderSourceDefinitionName(node: GeneratedNode): string {
  const derivedFrom =
    node.kind === 'Request' || node.kind === 'SplitOperation'
      ? node.metadata?.derivedFrom
      : null;
  return typeof derivedFrom === 'string' ? derivedFrom : node.name;
}

// Version for IR
function getSourceDefinitionName(
  node: Fragment | Request | Root | SplitOperation,
): string {
  const derivedFrom =
    node.kind === 'Request' ||
    node.kind === 'Root' ||
    node.kind === 'SplitOperation'
      ? node.metadata?.derivedFrom
      : null;
  return typeof derivedFrom === 'string' ? derivedFrom : node.name;
}

module.exports = {getReaderSourceDefinitionName, getSourceDefinitionName};
