package com.vzh.iherych.Service;

import com.vzh.iherych.Model.Comment;
import com.vzh.iherych.Repository.CommentRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.awt.print.Pageable;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Service
@RequiredArgsConstructor
public class CommentService {
    private final CommentRepository commentRepository;

    public Comment save(Comment comment) {
        if(comment.getText() == null || comment.getText().isEmpty()) {
            return null;
        }
        if(comment.getAuthor() == null) {
            return null;
        }
        comment.setDate(new Date(System.currentTimeMillis()));
        return commentRepository.save(comment);
    }

    public void delete(Comment comment) {
        commentRepository.delete(comment);
    }

    public List<Comment> getAllComments(Integer page, Integer size){
        Page<Comment> pagedResult = commentRepository.findAll(PageRequest.of(page, size, Sort.by("id").descending()));
        if(pagedResult.hasContent()) {
            return pagedResult.getContent();
        }
        return new ArrayList<Comment>();
    }
}
