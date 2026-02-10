import { McpOptions } from './options';

export type SdkMethod = {
  clientCallName: string;
  fullyQualifiedName: string;
  httpMethod?: 'get' | 'post' | 'put' | 'patch' | 'delete' | 'query';
  httpPath?: string;
};

export const sdkMethods: SdkMethod[] = [
  {
    clientCallName: 'client.messages.retrieve',
    fullyQualifiedName: 'messages.retrieve',
    httpMethod: 'get',
    httpPath: '/api/v2/messages/{message_id}',
  },
  {
    clientCallName: 'client.messages.list',
    fullyQualifiedName: 'messages.list',
    httpMethod: 'get',
    httpPath: '/api/v2/messages',
  },
  {
    clientCallName: 'client.messages.getStatus',
    fullyQualifiedName: 'messages.getStatus',
    httpMethod: 'get',
    httpPath: '/api/status',
  },
  {
    clientCallName: 'client.messages.send',
    fullyQualifiedName: 'messages.send',
    httpMethod: 'post',
    httpPath: '/api/send-message',
  },
  {
    clientCallName: 'client.groups.modify',
    fullyQualifiedName: 'groups.modify',
    httpMethod: 'post',
    httpPath: '/api/modify-group',
  },
  {
    clientCallName: 'client.groups.sendMessage',
    fullyQualifiedName: 'groups.sendMessage',
    httpMethod: 'post',
    httpPath: '/api/send-group-message',
  },
  {
    clientCallName: 'client.mediaObjects.upload',
    fullyQualifiedName: 'mediaObjects.upload',
    httpMethod: 'post',
    httpPath: '/api/upload-media-object',
  },
  {
    clientCallName: 'client.lookups.lookupNumber',
    fullyQualifiedName: 'lookups.lookupNumber',
    httpMethod: 'get',
    httpPath: '/api/evaluate-service',
  },
  {
    clientCallName: 'client.typingIndicators.send',
    fullyQualifiedName: 'typingIndicators.send',
    httpMethod: 'post',
    httpPath: '/api/send-typing-indicator',
  },
  {
    clientCallName: 'client.contacts.create',
    fullyQualifiedName: 'contacts.create',
    httpMethod: 'post',
    httpPath: '/api/v2/contacts',
  },
  {
    clientCallName: 'client.contacts.retrieve',
    fullyQualifiedName: 'contacts.retrieve',
    httpMethod: 'get',
    httpPath: '/api/v2/contacts/{phone_number}',
  },
  {
    clientCallName: 'client.contacts.update',
    fullyQualifiedName: 'contacts.update',
    httpMethod: 'put',
    httpPath: '/api/v2/contacts/{phone_number}',
  },
  {
    clientCallName: 'client.contacts.list',
    fullyQualifiedName: 'contacts.list',
    httpMethod: 'get',
    httpPath: '/api/v2/contacts',
  },
  {
    clientCallName: 'client.contacts.delete',
    fullyQualifiedName: 'contacts.delete',
    httpMethod: 'delete',
    httpPath: '/api/v2/contacts/{phone_number}',
  },
  {
    clientCallName: 'client.contacts.count',
    fullyQualifiedName: 'contacts.count',
    httpMethod: 'get',
    httpPath: '/api/v2/contacts/count',
  },
  {
    clientCallName: 'client.contacts.verify',
    fullyQualifiedName: 'contacts.verify',
    httpMethod: 'post',
    httpPath: '/api/v2/contacts/verify',
  },
  {
    clientCallName: 'client.contacts.bulk.create',
    fullyQualifiedName: 'contacts.bulk.create',
    httpMethod: 'post',
    httpPath: '/api/v2/contacts/bulk',
  },
  {
    clientCallName: 'client.contacts.bulk.delete',
    fullyQualifiedName: 'contacts.bulk.delete',
    httpMethod: 'delete',
    httpPath: '/api/v2/contacts',
  },
  {
    clientCallName: 'client.webhooks.create',
    fullyQualifiedName: 'webhooks.create',
    httpMethod: 'post',
    httpPath: '/api/account/webhooks',
  },
  {
    clientCallName: 'client.webhooks.update',
    fullyQualifiedName: 'webhooks.update',
    httpMethod: 'put',
    httpPath: '/api/account/webhooks',
  },
  {
    clientCallName: 'client.webhooks.list',
    fullyQualifiedName: 'webhooks.list',
    httpMethod: 'get',
    httpPath: '/api/account/webhooks',
  },
  {
    clientCallName: 'client.webhooks.delete',
    fullyQualifiedName: 'webhooks.delete',
    httpMethod: 'delete',
    httpPath: '/api/account/webhooks',
  },
];

function allowedMethodsForCodeTool(options: McpOptions | undefined): SdkMethod[] | undefined {
  if (!options) {
    return undefined;
  }

  let allowedMethods: SdkMethod[];

  if (options.codeAllowHttpGets || options.codeAllowedMethods) {
    // Start with nothing allowed and then add into it from options
    let allowedMethodsSet = new Set<SdkMethod>();

    if (options.codeAllowHttpGets) {
      // Add all methods that map to an HTTP GET
      sdkMethods
        .filter((method) => method.httpMethod === 'get')
        .forEach((method) => allowedMethodsSet.add(method));
    }

    if (options.codeAllowedMethods) {
      // Add all methods that match any of the allowed regexps
      const allowedRegexps = options.codeAllowedMethods.map((pattern) => {
        try {
          return new RegExp(pattern);
        } catch (e) {
          throw new Error(
            `Invalid regex pattern for allowed method: "${pattern}": ${e instanceof Error ? e.message : e}`,
          );
        }
      });

      sdkMethods
        .filter((method) => allowedRegexps.some((regexp) => regexp.test(method.fullyQualifiedName)))
        .forEach((method) => allowedMethodsSet.add(method));
    }

    allowedMethods = Array.from(allowedMethodsSet);
  } else {
    // Start with everything allowed
    allowedMethods = [...sdkMethods];
  }

  if (options.codeBlockedMethods) {
    // Filter down based on blocked regexps
    const blockedRegexps = options.codeBlockedMethods.map((pattern) => {
      try {
        return new RegExp(pattern);
      } catch (e) {
        throw new Error(
          `Invalid regex pattern for blocked method: "${pattern}": ${e instanceof Error ? e.message : e}`,
        );
      }
    });

    allowedMethods = allowedMethods.filter(
      (method) => !blockedRegexps.some((regexp) => regexp.test(method.fullyQualifiedName)),
    );
  }

  return allowedMethods;
}

export function blockedMethodsForCodeTool(options: McpOptions | undefined): SdkMethod[] | undefined {
  const allowedMethods = allowedMethodsForCodeTool(options);
  if (!allowedMethods) {
    return undefined;
  }

  const allowedSet = new Set(allowedMethods.map((method) => method.fullyQualifiedName));

  // Return any methods that are not explicitly allowed
  return sdkMethods.filter((method) => !allowedSet.has(method.fullyQualifiedName));
}
