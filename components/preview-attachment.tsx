import React from 'react';
import type { Attachment } from 'ai';
import { LoaderIcon } from './icons';

export const PreviewAttachment = ({
    attachment,
    isUploading = false,
}: {
    attachment: Attachment;
    isUploading?: boolean;
}) => {
    const { name, url, contentType } = attachment;

    return (
        <div data-testid="input-attachment-preview" className="flex flex-col gap-2">
            <div className="w-20 h-16 aspect-video bg-muted rounded-md relative flex flex-col items-center justify-center">
                {contentType ? (
                    contentType.startsWith('image') ? (
                        // NOTE: 建议使用next/image来处理图片
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                            key={url}
                            src={url}
                            alt={name ?? '图片附件'}
                            className="rounded-md size-full object-cover"
                        />
                    ) : (
                        <div className="" />
                    )
                ) : (
                    <div className="" />
                )}

                {isUploading && (
                    <div
                        data-testid="input-attachment-loader"
                        className="animate-spin absolute text-zinc-500"
                    >
                        <LoaderIcon />
                    </div>
                )}
            </div>
            <div className="text-xs text-zinc-500 max-w-16 truncate">{name}</div>
        </div>
    );
};
